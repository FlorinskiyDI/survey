
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { QuestionBase } from 'shared/models/form-builder/question-base.model';
import { CheckboxQuestion } from 'shared/models/form-builder/question-checkbox.model';
import { ControlOptionModel } from 'shared/models/form-builder/form-control/control-option.model';

@Component({
    selector: 'survey-viewer-question',
    templateUrl: './survey-viewer-question.component.html',
    styleUrls: [
        './survey-viewer-question.component.scss'
    ],
})
export class SurveyViewerQuestionComponent implements OnInit {



    @Input() question: QuestionBase<any>;
    @Input() pageId: string;
    @Input() form: FormGroup;

    constructor(
        private fb: FormBuilder,
    ) {

    }


    ngOnInit() {
    }


    onChange(questonId: string, optionId: string, isChecked: boolean, index: any) {
        debugger
        const checkboxquestion = this.question as CheckboxQuestion;
        const option = checkboxquestion.options.find((x: ControlOptionModel) => x.id === optionId);
        option.label = isChecked;

        const questionArray = <FormArray>this.form.controls[this.pageId].get(questonId);
        const val: any = 'answer';
        const checkBoxControl = questionArray.controls[val] as FormArray;
        console.log(this.question);
        if (isChecked) {
            checkBoxControl.push(new FormControl(optionId));
        } else {
            index = checkBoxControl.controls.findIndex((x: any) => x.value === optionId);
            checkBoxControl.removeAt(index);
        }
    }


    onChangeGridRadio(itemRowLabel: any, itemCol: any, label: string) {
        const radioArray = <FormArray>this.form.controls[this.pageId].get(this.question.id);
        const val: any = 'answer';
        const answerControl = radioArray.controls[val] as FormArray;
        const group: any = {};

        group['row'] = this.fb.group({
            'id': new FormControl(itemRowLabel.id),
            'label': new FormControl(itemRowLabel.value)
        });
        group['col'] = this.fb.group({
            'id': new FormControl(itemCol.id),
            'label': new FormControl(itemCol.value)
        });

        const item2 = answerControl.controls.findIndex((x: any) => x.controls['row'].controls['id'].value === itemRowLabel.id);
        const needcontrol = answerControl.controls[item2];
        if (!!needcontrol) {
            answerControl.removeAt(item2);
        }
        const formGroup = new FormGroup(group);
        answerControl.push(formGroup);
    }

}
