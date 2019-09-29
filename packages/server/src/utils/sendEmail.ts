import * as sendgrid from '@sendgrid/mail';
import { logger } from './logger';
import { MailData } from '@sendgrid/helpers/classes/mail';

interface ConfirmUserData {
  confirm_user_url: string;
  first_name: string;
}

interface EmailTemplates {
  confirmUser: ConfirmUserData;
}

type EmailTemplateName = keyof EmailTemplates;

type EmailTemplateIds = {
  [key in EmailTemplateName]: string;
};

const templates: EmailTemplateIds = {
  confirmUser: 'd-ea9cfed7161d405da97ba276610c6dac'
};

interface SendMailOptions<T extends EmailTemplateName> {
  from: string;
  to: string;
  template: T;
  data: EmailTemplates[T];
}

export const sendEmail = async <T extends EmailTemplateName>({
  template,
  data,
  from,
  to
}: SendMailOptions<T>) => {
  const templateId = templates[template];

  const mail: MailData = {
    from,
    to,
    templateId,
    dynamicTemplateData: data
  };

  try {
    await sendgrid.send(mail);
    logger.info('Sent mail', mail);
  } catch (e) {
    logger.error('Could not send mail', e);
  }
};
