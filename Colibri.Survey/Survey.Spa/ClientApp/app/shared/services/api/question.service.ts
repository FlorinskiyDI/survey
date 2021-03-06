import { Injectable } from '@angular/core';
// import { SurveyModel } from '../../models/form-builder/survey.model';
import { PageModel } from '../../models/form-builder/page.model';



import { QuestionBase } from '../../models/form-builder/question-base.model';
import { TextboxQuestion } from '../../models/form-builder/question-textbox.model';
import { DropdownQuestion } from '../../models/form-builder/question-dropdown.model';
import { TextAreaQuestion } from '../../models/form-builder/question-textarea.model';
// import { RadioQuestion } from '../../models/form-builder/question-radio.model';
// import { CheckboxQuestion } from '../../models/form-builder/question-checkbox.model';
// import { GridRadioQuestion } from '../../models/form-builder/question-grid-radio.model';


@Injectable()
export class QuestionService {

  // Todo: get from a remote source of question metadata
  // Todo: make asynchronous
  getQuestions() {
    const questions: QuestionBase<any>[] = [

      new TextboxQuestion({
        //  controlType: 'textbox', // same as in control-type.constant.ts
        id: 'id_firstName',
        text: 'First name',
        description: 'some description',
        value: '',
        required: true,
        order: 0,
        isAdditionalAnswer: true
      }),

      // new DropdownQuestion({
      //   // controlType: 'dropdown', // same as in control-type.constant.ts
      //   id: 'id_brave', // unique value
      //   text: 'Bravery Rating (text)',
      //   description: 'some description',
      //   options: [
      //     { id: 'id_solid', label: '', value: 'Solid', order: 1 },
      //     { id: 'id_great', label: '', value: 'Great', order: 2 },
      //     { id: 'id_good', label: '', value: 'Good', order: 3 },
      //     { id: 'id_unproven', label: '', value: 'Unproven', order: 4 }
      //   ],
      //   order: 0,
      //   required: true,
      //   isAdditionalAnswer: true
      // }),

      // new TextAreaQuestion({
      // //  controlType: 'textarea', // same as in control-type.constant.ts
      //   id: 'id_lastname',
      //   text: 'last name',
      //   description: 'some description',
      //   value: '',
      //   required: true,
      //   order: 1,
      //   isAdditionalAnswer: true
      // }),


      // new RadioQuestion({
      //   //  controlType: 'radio', // same as in control-type.constant.ts
      //   id: 'id_Radion question',
      //   text: 'Bravery radion',
      //   description: 'some description',
      //   options: [
      //     { id: 'id_Option 1', label: false, value: 'Option 1', order: 1 },
      //     { id: 'id_Option 2', label: false, value: 'Option 2', order: 2 },
      //     { id: 'id_Option 3', label: false, value: 'Option 3', order: 3 },
      //     { id: 'id_Option 4', label: false, value: 'Option 4', order: 4 },
      //   ],
      //   order: 7,
      //   required: true,
      //   isAdditionalAnswer: true
      // }),

      // new CheckboxQuestion({
      //   //  controlType: 'checkbox', // same as in control-type.constant.ts
      //   id: 'id_Checkbox groupe',
      //   text: 'Bravery checkbox',
      //   description: 'some description',
      //   options: [
      //     { id: 'id_Option 1', label: false, value: 'Variable 1', order: 1 },
      //     { id: 'id_Option 2', label: false, value: 'Variable 2', order: 2 },
      //     { id: 'id_Option 3', label: false, value: 'Variable 3', order: 3 },
      //   ],
      //   order: 0,
      //   required: true,
      //   isAdditionalAnswer: true
      // }),

      // new GridRadioQuestion({
      //   //  controlType: 'gridRadio', // same as in control-type.constant.ts
      //   id: 'id_grid radio',
      //   text: 'Grid question, some text for long input, some text for long input, some text for long input, some text for long input',
      //   description: 'Some description ...',
      //   grid: {
      //     cellInputType: 'radio',  // radio, checkbox
      //     rows: [
      //       { id: 'id_question1', label: null, value: 'Variable question 1', order: 1 },
      //       { id: 'id_question2', label: null, value: 'Variable question 2', order: 2 },
      //       { id: 'id_question3', label: null, value: 'Variable question 3', order: 3 },
      //       { id: 'id_question4', label: null, value: 'Variable question 4', order: 4 }
      //       // {
      //       //   id: 'f35a6e5d1ce9407b5ece224198032cb6',
      //       //   orderNo: 2,
      //       //   label: 'row 2'
      //       // },
      //     ],
      //     cols: [
      //       { id: 'id_answer1', label: null, value: 'answer 1', order: 1 },
      //       { id: 'id_answer2', label: null, value: 'answer 2', order: 2 },
      //       { id: 'id_answer3', label: null, value: 'answer 3', order: 3 },
      //       { id: 'id_answer4', label: null, value: 'answer 4', order: 4 },
      //       { id: 'id_answer5', label: null, value: 'answer 5', order: 5 }
      //       // {
      //       //   id: '24062ae1fc97dead41d337ede7f2e54e',
      //       //   orderNo: 5,
      //       //   label: 'col5'
      //       // },
      //     ]
      //   },
      //   pageFlowModifier: false,
      //   order: 2,
      //   required: true,
      //   isAdditionalAnswer: true
      // })
    ];

    return questions.sort((a, b) => a.order - b.order);
  }


  getSurvey() {
    // const questions: QuestionBase<any>[] = [
    //   // new TextboxQuestion({
    //   //   //  controlType: 'textbox', // same as in control-type.constant.ts
    //   //   id: 'id_firstName11',
    //   //   text: 'First name (change data)',
    //   //   description: 'some description (change data)',
    //   //   value: '',
    //   //   required: false,
    //   //   order: 0,
    //   //   isAdditionalAnswer: true
    //   // }),
    //   new TextboxQuestion({
    //     //  controlType: 'textbox', // same as in control-type.constant.ts
    //     id: 'id_firstName22',
    //     text: 'First name (change data22)',
    //     description: 'some description (change data22)',
    //     value: '',
    //     required: false,
    //     order: 0,
    //     isAdditionalAnswer: true
    //   }),
    //   new DropdownQuestion({
    //     // controlType: 'dropdown', // same as in control-type.constant.ts
    //     id: 'id_brave', // unique value
    //     text: 'Bravery Rating (text)',
    //     description: 'some description',
    //     options: [
    //       { id: 'id_solid', label: '11', value: 'Solid', order: 1 },
    //       { id: 'id_great', label: '22', value: 'Great', order: 2 },
    //       { id: 'id_good', label: '33', value: 'Good', order: 3 },
    //       { id: 'id_unproven', label: '44', value: 'Unproven', order: 4 }
    //     ],
    //     order: 1,
    //     required: true,
    //     isAdditionalAnswer: true
    //   })

    // ];

    // const questions2: QuestionBase<any>[] = [

    //   new DropdownQuestion({
    //     // controlType: 'dropdown', // same as in control-type.constant.ts
    //     id: 'id_brave', // unique value
    //     text: 'Bravery Rating (text)',
    //     description: 'some description',
    //     options: [
    //       { id: 'id_solid', label: '', value: 'Solid', order: 1 },
    //       { id: 'id_great', label: '', value: 'Great', order: 2 },
    //       { id: 'id_good', label: '', value: 'Good', order: 3 },
    //       { id: 'id_unproven', label: '', value: 'Unproven', order: 4 }
    //     ],
    //     order: 0,
    //     required: true,
    //     isAdditionalAnswer: true
    //   }),

    //   new TextAreaQuestion({
    //     //  controlType: 'textarea', // same as in control-type.constant.ts
    //     id: 'id_lastname',
    //     text: 'last name',
    //     description: 'some description',
    //     value: '',
    //     required: true,
    //     order: 1,
    //     isAdditionalAnswer: true
    //   }),


    //   // new RadioQuestion({
    //   //   //  controlType: 'radio', // same as in control-type.constant.ts
    //   //   id: 'id_Radion question',
    //   //   text: 'Bravery radion',
    //   //   description: 'some description',
    //   //   options: [
    //   //     { id: 'id_Option 1', label: false, value: 'Option 1', order: 1 },
    //   //     { id: 'id_Option 2', label: false, value: 'Option 2', order: 2 },
    //   //     { id: 'id_Option 3', label: false, value: 'Option 3', order: 3 },
    //   //     { id: 'id_Option 4', label: false, value: 'Option 4', order: 4 },
    //   //   ],
    //   //   order: 7,
    //   //   required: true,
    //   //   isAdditionalAnswer: true
    //   // }),

    //   // new CheckboxQuestion({
    //   //   //  controlType: 'checkbox', // same as in control-type.constant.ts
    //   //   id: 'id_Checkbox groupe',
    //   //   text: 'Bravery checkbox',
    //   //   description: 'some description',
    //   //   options: [
    //   //     { id: 'id_Option 1', label: false, value: 'Variable 1', order: 1 },
    //   //     { id: 'id_Option 2', label: false, value: 'Variable 2', order: 2 },
    //   //     { id: 'id_Option 3', label: false, value: 'Variable 3', order: 3 },
    //   //   ],
    //   //   order: 0,
    //   //   required: true,
    //   //   isAdditionalAnswer: true
    //   // }),

    //   // new GridRadioQuestion({
    //   //   //  controlType: 'gridRadio', // same as in control-type.constant.ts
    //   //   id: 'id_grid radio',
    //   //   text: 'Grid question, some text for long input, some text for long input, some text for long input, some text for long input',
    //   //   description: 'Some description ...',
    //   //   grid: {
    //   //     cellInputType: 'radio',  // radio, checkbox
    //   //     rows: [
    //   //       { id: 'id_question1', label: null, value: 'Variable question 1', order: 1 },
    //   //       { id: 'id_question2', label: null, value: 'Variable question 2', order: 2 },
    //   //       { id: 'id_question3', label: null, value: 'Variable question 3', order: 3 },
    //   //       { id: 'id_question4', label: null, value: 'Variable question 4', order: 4 }
    //   //       // {
    //   //       //   id: 'f35a6e5d1ce9407b5ece224198032cb6',
    //   //       //   orderNo: 2,
    //   //       //   label: 'row 2'
    //   //       // },
    //   //     ],
    //   //     cols: [
    //   //       { id: 'id_answer1', label: null, value: 'answer 1', order: 1 },
    //   //       { id: 'id_answer2', label: null, value: 'answer 2', order: 2 },
    //   //       { id: 'id_answer3', label: null, value: 'answer 3', order: 3 },
    //   //       { id: 'id_answer4', label: null, value: 'answer 4', order: 4 },
    //   //       { id: 'id_answer5', label: null, value: 'answer 5', order: 5 }
    //   //       // {
    //   //       //   id: '24062ae1fc97dead41d337ede7f2e54e',
    //   //       //   orderNo: 5,
    //   //       //   label: 'col5'
    //   //       // },
    //   //     ]
    //   //   },
    //   //   pageFlowModifier: false,
    //   //   order: 2,
    //   //   required: true,
    //   //   isAdditionalAnswer: true
    //   // })

    // ];

    const survey: any = {
      //  controlType: 'textbox', // same as in control-type.constant.ts
      id: 'fbd8800b-93ee-4707-b527-83feb23fb005',
      name: 'New Project...',
      description: 'The short introduction...',
      processCompletedText: 'We thank you for your time spent taking this survey. Your response has been recorded...',
      isShowProcessCompletedText: true,
      isShowDescription: true,
      isOpenAccess: true,
      isLocked: true,
      pages: [
        new PageModel(
          {
            id: 'fbd8800b-93ee-4706-b527-83feb23fb001',
            name: 'page name 1',
            description: 'page 1 description (change data)',
            order: 0,
            questions: [
              // new GridRadioQuestion({
              //   //  controlType: 'gridRadio', // same as in control-type.constant.ts
              //   id: 'id_grid radio',
              //   text: 'Grid question, some text for long input, some text for long input, some text for long input, some text for long input',
              //   description: 'Some description ...',
              //   grid: {
              //     cellInputType: 'radio',  // radio, checkbox
              //     rows: [
              //       { id: 'id_question1', label: null, value: 'Variable question 1', order: 1 },
              //       { id: 'id_question2', label: null, value: 'Variable question 2', order: 2 },
              //       { id: 'id_question3', label: null, value: 'Variable question 3', order: 3 },
              //       { id: 'id_question4', label: null, value: 'Variable question 4', order: 4 }
              //       // {
              //       //   id: 'f35a6e5d1ce9407b5ece224198032cb6',
              //       //   orderNo: 2,
              //       //   label: 'row 2'
              //       // },
              //     ],
              //     cols: [
              //       { id: 'id_answer1', label: null, value: 'answer 1', order: 1 },
              //       { id: 'id_answer2', label: null, value: 'answer 2', order: 2 },
              //       { id: 'id_answer3', label: null, value: 'answer 3', order: 3 },
              //       { id: 'id_answer4', label: null, value: 'answer 4', order: 4 },
              //       { id: 'id_answer5', label: null, value: 'answer 5', order: 5 }
              //       // {
              //       //   id: '24062ae1fc97dead41d337ede7f2e54e',
              //       //   orderNo: 5,
              //       //   label: 'col5'
              //       // },
              //     ]
              //   },
              //   pageFlowModifier: false,
              //   order: 0,
              //   required: true,
              //   isAdditionalAnswer: false
              // })


              // new TextboxQuestion({
              //   // controlType: 'textbox', // same as in control-type.constant.ts
              //   id: 'fbd8800b-93ee-4706-b527-83feb23fb005',
              //   text: 'First name (change data22)',
              //   description: 'some description (change data22)',
              //   value: '',
              //   required: false,
              //   order: 0,
              //   isAdditionalAnswer: true
              // }),
              // new CheckboxQuestion({
              //   //  controlType: 'checkbox', // same as in control-type.constant.ts
              //   id: 'fbd8877b-93ee-4707-b527-83feb23fb005',
              //   text: 'Bravery checkbox',
              //   description: 'some description',
              //   options: [
              //     { id: 'fbd8877b-93ee-5107-b527-83feb23fb005', label: false, value: 'Variable 1', order: 1 },
              //     { id: 'fbd8877b-93ee-5207-b527-83feb23fb005', label: false, value: 'Variable 2', order: 2 },
              //     { id: 'fbd8877b-93ee-5307-b527-83feb23fb005', label: false, value: 'Variable 3', order: 3 },
              //   ],
              //   order: 0,
              //   required: true,
              //   isAdditionalAnswer: true
              // }),
              // new DropdownQuestion({
              //   controlType: 'Dropdown', // same as in control-type.constant.ts
              //   id: 'id_brave', // unique value
              //   text: 'Bravery Rating (text)',
              //   description: 'some description',
              //   options: [
              //     { id: 'id_solid', label: '', value: 'Solid', order: 1 },
              //     { id: 'id_great', label: '', value: 'Great', order: 2 },
              //     { id: 'id_good', label: '', value: 'Good', order: 3 },
              //     { id: 'id_unproven', label: '', value: 'Unproven', order: 4 }
              //   ],
              //   order: 0,
              //   required: true,
              //   isAdditionalAnswer: true
              // }),
            ]
          }
        ),
        // new PageModel(
        //   {
        //     id: 'fbd8800b-934e-4706-b527-83feb23fb115',
        //     name: 'page name 2111111111111111111',
        //     description: 'page 2 description (change data)111111111111111111',
        //     order: 1,
        //     questions: []
        //   }
        // ),
        // new PageModel(
        //   {
        //     id: 'fbd8800b-93ee-4706-b527-83feb23fb005',
        //     name: 'page name 3',
        //     description: 'page 3 description',
        //     order: 3,
        //     questions: []
        //   }
        // ),
      ]
    };


    // const survey: SurveyModel = {

    //   id: '7180d9e3d0c341bb99c91c73d5b973d1',
    //   name: 'survey name 1',
    //   description: 'some description for survey ',
    //   pages: null

    // };

    return survey;
  }










  getNew1Questions() {
    const questions: QuestionBase<any>[] = [


      new TextboxQuestion({
        //  controlType: 'textbox', // same as in control-type.constant.ts
        id: 'id_firstName11',
        text: 'First name (change data)',
        description: 'some description (change data)',
        value: '',
        required: true,
        order: 0,
        isAdditionalAnswer: true
      })
    ];
    const questions2: QuestionBase<any>[] = [

      new DropdownQuestion({
        // controlType: 'dropdown', // same as in control-type.constant.ts
        id: 'id_brave555', // unique value
        text: 'Bravery Rating (text)55555555555',
        description: 'some description55555555555',
        options: [
          { id: 'id_solid', label: '', value: 'Solid', order: 1 },
          { id: 'id_great', label: '', value: 'Great', order: 2 },
          { id: 'id_good', label: '', value: 'Good', order: 3 },
          { id: 'id_unproven', label: '', value: 'Unproven', order: 4 }
        ],
        order: 0,
        required: true,
        isAdditionalAnswer: true
      }),

      new TextAreaQuestion({
        //  controlType: 'textarea', // same as in control-type.constant.ts
        id: 'id_lastname',
        text: 'last name',
        description: 'some description',
        value: '',
        required: true,
        order: 1,
        isAdditionalAnswer: true
      }),


      // new RadioQuestion({
      //   //  controlType: 'radio', // same as in control-type.constant.ts
      //   id: 'id_Radion question',
      //   text: 'Bravery radion',
      //   description: 'some description',
      //   options: [
      //     { id: 'id_Option 1', label: false, value: 'Option 1', order: 1 },
      //     { id: 'id_Option 2', label: false, value: 'Option 2', order: 2 },
      //     { id: 'id_Option 3', label: false, value: 'Option 3', order: 3 },
      //     { id: 'id_Option 4', label: false, value: 'Option 4', order: 4 },
      //   ],
      //   order: 7,
      //   required: true,
      //   isAdditionalAnswer: true
      // }),

      // new CheckboxQuestion({
      //   //  controlType: 'checkbox', // same as in control-type.constant.ts
      //   id: 'id_Checkbox groupe',
      //   text: 'Bravery checkbox',
      //   description: 'some description',
      //   options: [
      //     { id: 'id_Option 1', label: false, value: 'Variable 1', order: 1 },
      //     { id: 'id_Option 2', label: false, value: 'Variable 2', order: 2 },
      //     { id: 'id_Option 3', label: false, value: 'Variable 3', order: 3 },
      //   ],
      //   order: 0,
      //   required: true,
      //   isAdditionalAnswer: true
      // }),

      // new GridRadioQuestion({
      //   //  controlType: 'gridRadio', // same as in control-type.constant.ts
      //   id: 'id_grid radio',
      //   text: 'Grid question, some text for long input, some text for long input, some text for long input, some text for long input',
      //   description: 'Some description ...',
      //   grid: {
      //     cellInputType: 'radio',  // radio, checkbox
      //     rows: [
      //       { id: 'id_question1', label: null, value: 'Variable question 1', order: 1 },
      //       { id: 'id_question2', label: null, value: 'Variable question 2', order: 2 },
      //       { id: 'id_question3', label: null, value: 'Variable question 3', order: 3 },
      //       { id: 'id_question4', label: null, value: 'Variable question 4', order: 4 }
      //       // {
      //       //   id: 'f35a6e5d1ce9407b5ece224198032cb6',
      //       //   orderNo: 2,
      //       //   label: 'row 2'
      //       // },
      //     ],
      //     cols: [
      //       { id: 'id_answer1', label: null, value: 'answer 1', order: 1 },
      //       { id: 'id_answer2', label: null, value: 'answer 2', order: 2 },
      //       { id: 'id_answer3', label: null, value: 'answer 3', order: 3 },
      //       { id: 'id_answer4', label: null, value: 'answer 4', order: 4 },
      //       { id: 'id_answer5', label: null, value: 'answer 5', order: 5 }
      //       // {
      //       //   id: '24062ae1fc97dead41d337ede7f2e54e',
      //       //   orderNo: 5,
      //       //   label: 'col5'
      //       // },
      //     ]
      //   },
      //   pageFlowModifier: false,
      //   order: 2,
      //   required: true,
      //   isAdditionalAnswer: true
      // })

    ];

    const survey: any = {
      //  controlType: 'textbox', // same as in control-type.constant.ts
      id: 'id_firstName11',
      name: 'survey name 1',
      description: 'First name (change data)',
      processCompletedText: 'We thank you for your time spent taking this survey. Your response has been recorded...',
      isShowProcessCompletedText: true,
      isShowDescription: true,
      isLocked: true,
      isOpenAccess: true,

      pages: [
        new PageModel(
          {
            id: 'id_page1',
            name: 'page name 1',
            description: 'page 1 description (change data)',
            order: 1,
            questions: questions
          }
        ),
        new PageModel(
          {
            id: 'id_page 2',
            name: 'page name 2111111111111111111',
            description: 'page 2 description (change data)111111111111111111',
            order: 2,
            questions: questions2
          }
        ),
      ]
    };


    // const survey: SurveyModel = {

    //   id: '7180d9e3d0c341bb99c91c73d5b973d1',
    //   name: 'survey name 1',
    //   description: 'some description for survey ',
    //   pages: null

    // };

    return survey;
  }
}
