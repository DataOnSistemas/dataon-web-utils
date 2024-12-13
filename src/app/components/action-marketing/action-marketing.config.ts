import {FormGroup} from "@angular/forms";

export class ActionMarketingConfig{

  fields: any[] = [
    {
      fieldName: 'messageModel',
      required: true,
      hidden: false,
      type: 'string'
    },
    {
      fieldName: 'name',
      required: true,
      hidden: false,
      type: 'string'
    },
    {
      fieldName: 'number',
      required: true,
      hidden: false,
      type: 'string'
    },
    {
      fieldName: 'message',
      required: true,
      hidden: false,
      type: 'string'
    },
  ]

  convertToDTO(formGroup: FormGroup): any {
    return {
      messageModel: formGroup.get('messageModel')?.value,
      name: formGroup.get('name')?.value,
      number: formGroup.get('number')?.value,
      message: formGroup.get('message')?.value
    };
  }
}
