import Mailchimp from 'mailchimp-api-v3';
import _ from 'lodash';

const mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY);

export default function memberLookup(email) {
  return new Promise((resolve, reject) => {
    mailchimp.get({
      method: 'get',
      path: `/search-members`,
      params: {
        list_id: process.env.MAILCHIMP_CONTACT_LIST_ID,
        fields: ["email_address"],
        query: email
      }
    })
      .then((result) => {
        let contact = _.get(result, ['exact_matches', 'members', 0]);
        let isMember = false;

        if(contact) {
          // Membership information is stored as a segment, which shows up in
          // the member object as an interest
          isMember = _.get(contact,
                           ['interests',
                            process.env.MAILCHIMP_MEMBER_SEGMENT_ID],
                           false);
        }

        resolve(isMember);
      }).catch(reject);
  });
}
