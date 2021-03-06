import { Component, Input, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { TreeDragDropService } from 'primeng/components/common/api';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

/* service-api */ import { GroupMembersApiService } from 'shared/services/api/group-members.api.service';
/* model-api */ import { SearchQueryApiModel, SearchQueryPage } from 'shared/models/entities/api/page-search-entry.api.model';


@Component({
    selector: 'cmp-member-data-grid',
    templateUrl: './member-data-grid.component.html',
    styleUrls: ['./member-data-grid.component.scss'],
    providers: [
        TreeDragDropService,
        ConfirmationService,
        MessageService
    ]
})

export class MemberDataGridComponent implements OnInit {
    @ViewChild('dtMembers') dtMembers: any;
    // output events
    @Output() deleteItem = new EventEmitter<any>();
    @Output() editItem = new EventEmitter<any>();
    // input events
    @Input() eventResetData: Observable<any>;
    private subscriberResetData: any;


    items: any[] = [];
    groupId: any;
    // table
    tbItems: any[] = [];
    tbCols: any[] = [];
    tbLoading = true;
    tbTotalItemCount: number;
    tbSelectedColumns: any[];
    // option
    optionTbToggle: any = {
        columns: [
            { field: 'userName', header: 'Member name', width: 320 },
            { field: 'email', header: 'Email', width: 200 },
            { field: 'emailConfirmed', header: 'Is activate', width: 200 },
            { field: 'dateOfSubscribe', header: 'Date of subscribe', width: 220 }
        ],
        filter: false
    };

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private groupMembersApiService: GroupMembersApiService,
        private route: ActivatedRoute,
    ) {
        this.tbSelectedColumns = [this.optionTbToggle.columns[0], this.optionTbToggle.columns[1], this.optionTbToggle.columns[3]];
        this.tbLoading = true;
        this.route.parent.params.subscribe((params: any) => {
            this.groupId = params['id'] ? params['id'] : null;
        });
    }

    ngOnInit() {

        this.items = [
            { label: 'Add member(s)', icon: 'pi pi-refresh', command: () => { this.addMembersByEmails(); }},
            { label: 'Import csv', icon: 'pi pi-times', command: () => { this.addByImportCsv(); }}
        ];
        this.subscriberResetData = this.eventResetData.subscribe(() => this.dtMembers.reset());
    }
    ngOnDestroy() {
        this.subscriberResetData.unsubscribe();
    }

    addByImportCsv() { console.log('addByImportCsv'); }
    addMembersByEmails() { console.log('addMembersByEmails'); }


    item_edit(groupId: string) { this.editItem.emit(groupId); }
    item_unsubscribe(memberId: string) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to remove this group?',
            accept: () => {
                this.groupMembersApiService.deleteMemberFromGroup(this.groupId, memberId).subscribe(
                    (response: any) => {
                        this.dtMembers.reset();
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Group was removed successfully' });
                    },
                    (error: any) => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error' });
                    }
                );
            }
        });
    }

    tb_loadItems(event: any) {
        this.tbLoading = true;
        const searchEntry = {
            searchQueryPage: {
                pageNumber: event.first,
                pageLength: event.rows
            } as SearchQueryPage,
            orderStatement: (event.sortField && event.sortOrder)
                ? { columName: event.sortField, reverse: event.sortOrder > 0 }
                : null
        } as SearchQueryApiModel;
        this._requestGetRootGroups(searchEntry);
    }

    _requestGetRootGroups(searchEntry: SearchQueryApiModel) {
        this.tbLoading = true;
        this.groupMembersApiService.getByGroup(this.groupId, searchEntry).subscribe((response: any) => {
            this.tbLoading = false;
            this.tbItems = response.itemList;
            this.tbTotalItemCount = response.totalItemCount;
        });
    }




}
