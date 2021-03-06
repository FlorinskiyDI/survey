﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dataaccesscore.Abstractions.Uow;
using dataaccesscore.EFCore.Query;
using IdentityServer.Webapi.Data;
using IdentityServer.Webapi.Dtos;
using IdentityServer.Webapi.Dtos.Search;
using IdentityServer.Webapi.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace IdentityServer.Webapi.Services
{
    public class MemberService : IMemberService
    {

        private readonly ApplicationUserManager _userManager;
        private readonly IUserService _appUserService;
        protected readonly IUowProvider _uowProvider;

        public MemberService(
            UserManager<ApplicationUser> userManager,
            IUserService appUserService,
            IUowProvider uowProvider
        )
        {
            _userManager = userManager as ApplicationUserManager;
            _appUserService = appUserService;
            _uowProvider = uowProvider;
        }

        public async Task<MemberGroups> AddUserToGroup(MemberGroups model)
        {
            try
            {
                using (var uow = _uowProvider.CreateUnitOfWork())
                {
                    var repository = uow.GetRepository<MemberGroups>();
                    var result = await repository.AddAsync(model);
                    await uow.SaveChangesAsync();

                    return result;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task DeletePathsWhereGroup(string groupId)
        {
            try
            {
                using (var uow = _uowProvider.CreateUnitOfWork())
                {
                    var repository = uow.GetRepository<MemberGroups>();
                    var list = await repository.QueryAsync(c => c.GroupId == new Guid(groupId));
                    repository.RemoveRange(list);
                    await uow.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return;
        }

        public async Task<SearchResult<MemberDto>> GetMembersByGroup(string groupId, SearchQuery searchEntry)
        {
            // generate sort expression
            var sort = searchEntry?.OrderStatement == null
                ? new OrderBy<MemberGroups>(c => c.OrderBy(d => d.Id))
                : new OrderBy<MemberGroups>(searchEntry.OrderStatement.ColumName, searchEntry.OrderStatement.Reverse);
            // generate filter expression
            var filters = new Filter<MemberGroups>(d => d.GroupId == new Guid(groupId));
            var includes = new Includes<MemberGroups>(c => c.Include(d => d.User));

            var page = new SearchResult<MemberDto>();
            try
            {
                using (var uow = _uowProvider.CreateUnitOfWork())
                {
                    var repository = uow.GetRepository<MemberGroups>();

                    // get data
                    if (searchEntry?.SearchQueryPage == null)
                    {
                        var data = await repository.QueryAsync(filters.Expression, sort.Expression, includes.Expression);
                        page = new SearchResult<MemberDto>()
                        {
                            ItemList = this.MapMemberEntityToMemberDto(data).ToList(),
                        };
                    }
                    // get page data
                    else
                    {
                        var startRow = searchEntry.SearchQueryPage.PageNumber;
                        var data = await repository.QueryPageAsync(filters.Expression, sort.Expression, includes.Expression, startRow, searchEntry.SearchQueryPage.PageLength);
                        var totalCount = await repository.CountAsync(filters.Expression);

                        page = new SearchResult<MemberDto>()
                        {
                            ItemList = this.MapMemberEntityToMemberDto(data).ToList(),
                            SearchResultPage = new SearchResultPage()
                            {
                                TotalItemCount = totalCount,
                                PageLength = searchEntry.SearchQueryPage.PageLength,
                                PageNumber = totalCount / searchEntry.SearchQueryPage.PageLength
                            }
                        };
                    }
                }
            }
            catch (Exception ex) { throw ex; }

            return page;
        }



        public async Task AddMembersToGroupByEmailsAsync(IEnumerable<string> emailList, Guid groupId)
        {
            // check and get users by email in system
            var userList = new List<ApplicationUser>();
            foreach (var email in emailList)
            {
                var user = await _appUserService.AddUserByEmailWithoutPassword(email);
                userList.Add(user);
            }

            // add relationchips between user and group (members)
            var memberGroupList = userList.Select(c => new MemberGroups() { UserId = c.Id, GroupId = groupId });
            using (var uow = _uowProvider.CreateUnitOfWork())
            {
                var repository = uow.GetRepository<MemberGroups>();
                await repository.AddRangeAsync(memberGroupList);
                await uow.SaveChangesAsync();
            }

            return;
        }

        public async Task DeleteMemberOfGroupAsync(Guid id)
        {
            using (var uow = _uowProvider.CreateUnitOfWork())
            {
                var repository = uow.GetRepository<MemberGroups>();
                var entity = await repository.GetAsync<Guid>(id);
                if (entity != null)
                {
                    repository.Remove(entity);
                    uow.SaveChanges();
                } 
                else
                {
                    throw new Exception($"Entity 'memberGroup' was not found with id: {id}");
                }
            }
        }


        private IEnumerable<MemberDto> MapMemberEntityToMemberDto(IEnumerable<MemberGroups> list)
        {
            return list.Select(c => new MemberDto
            {
                Id = c.Id,
                UserId = c.User.Id.ToString(),
                UserName = c.User.UserName,
                Email = c.User.Email,
                EmailConfirmed = c.User.EmailConfirmed,
                DateOfSubscribe = c.DateOfSubscribe
            });
        }

        public async Task GetPolicy(Guid userId)
        {

            //var roles = ClassHelper.GetConstantValues<SystemStaticPermissions.Groups>();
            //return roles;
        }

        public async Task SetPolicy(GroupPolicyDto policy, Guid groupId)
        {
            foreach (var email in policy.Emails)
            {
                // get user data
                var user = await _userManager.FindByEmailAsync(email);
                if (user == null)
                {
                    user = await _appUserService.AddUserByEmailWithoutPassword(email);
                }
                foreach (var role in policy.Roles)
                {
                    await _userManager.AddToRoleAsync(user, role, groupId);
                }
                using (var uow = _uowProvider.CreateUnitOfWork())
                {
                    var repository = uow.GetRepository<MemberGroups>();
                    await repository.AddAsync(new MemberGroups() { UserId = user.Id, GroupId = groupId });
                    await uow.SaveChangesAsync();
                }
            }
        }


        //public async Task<bool> AddMembersToGroupAsync(Guid groupId, List<string> emailList)
        //{
        //    foreach (var email in emailList)
        //    {
        //        var user = await _appUserService.AddUserByEmailWithoutPassword(email);
        //        //_groupServices.SubscribeToGroupAsync(user.Id, groupId);
        //    }
        //    //
        //    return true;
        //}

        //public async Task<IEnumerable<ApplicationUser>> GetMembersForGroupAsync(Guid groupId)
        //{
        //    var list = await _appUserRepository.GetAppUsersForGroup(groupId);
        //    //
        //    return list;
        //}

        //public async Task DeleteMember(string userId, Guid groupId)
        //{
        //    //await _groupServices.UnsubscribeToGroup(userId, groupId);
        //    return;
        //}
    }
}
