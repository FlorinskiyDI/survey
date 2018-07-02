
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { SurveysApiService } from 'shared/services/api/surveys.api.service';
import { SurveyModel } from 'shared/models/form-builder/survey.model';
import { QuestionTransferService } from 'shared/transfers/question-transfer.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'survey-viewer',
    templateUrl: './survey-viewer.component.html',
    styleUrls: [
        './survey-viewer.component.scss'
    ],
    // template: `<router-outlet></router-outlet>`
})
export class SurveyViewerComponent implements OnInit {

    errorList: FormGroup = null;
    survey: SurveyModel = null;
    page: any;
    activeSurveyId: any;
    pageinglist: any[];


    constructor(
        private route: ActivatedRoute,
        private surveysApiService: SurveysApiService,
        private questionTransferService: QuestionTransferService,
    ) {
        this.route.params.subscribe((params: any) => {
            this.activeSurveyId = params['id'];
        });
        window.scroll(0, 0);

        this.questionTransferService.getViewerPage().subscribe((pageId: string) => {
            // Init data
            window.scroll(0, 0);
            this.page = this.survey.pages.find(item => item.id === pageId);
            this.questionTransferService.setFormViewrPage(this.page);
            // this.form.addControl(page.id, this.questionService.getFormPageGroup(page));
        });
    }


    ngOnInit() {
        this.surveysApiService.get(this.activeSurveyId).subscribe((data: SurveyModel) => {
            this.survey = data;
            if (this.survey.pages) {
                this.page = data.pages[0];
                // this.questions = this.survey.pages[0].questions;
                this.pageinglist = this.generatePagingList(data.pages);
            }
        });
    }



    generatePagingList(pages: any[]) {
        const result: any[] = [];
        pages.forEach((item: any, index: number) => {
            result.push({ title: 'Page', id: item.id, index: index });
        });
        return result;
    }


    sendAnswers(data: FormGroup) {
        this.errorList = data;

        Object.keys(data.controls)
            .forEach(controlName => {
                debugger
                if (data.controls[controlName].valid) {
                    console.log(data.controls[controlName].valid);
                }
                // data.controls[controlName].markAsTouched();
            });

        /** Прерываем выполнение метода*/
        return;
    }
    // if (data.valid) {
    //     console.log(data);
    // } else {

    //     for (FormControl item1 in data.controls) {

    //     }

    //     data.forEach((element: any) => {
    //         // if (!element.valid) {
    //         //     this.errorList.push(element);
    //         // }
    //     });

    //     console.log(this.errorList);
    // }
}
}
