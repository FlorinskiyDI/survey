﻿using IdentityServer.Webapi.Dtos;
using IdentityServer.Webapi.Dtos.Search;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IdentityServer.Webapi.Services.Interfaces
{
    public interface IMemberService
    {
        Task<SearchResult<MemberDto>> GetMembersByGroup(string groupId, SearchQuery searchEntry);
        Task AddMembersToGroupByEmailsAsync(IEnumerable<string> emailList, Guid groupId);
        Task DeleteMemberOfGroupAsync(string userId, Guid groupId);

        //Task<bool> AddMembersToGroupAsync(Guid groupId, List<string> emailList);
        //Task<IEnumerable<ApplicationUser>> GetMembersForGroupAsync(Guid groupId);
        //Task DeleteMember(string userId, Guid groupId);
    }
}