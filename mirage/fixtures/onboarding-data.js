import onboardingStatus from 'example/types/onboarding-status';
import userRole from 'example/types/user-role';

export default {
  email: 'admin@example.com',
  fax: null,
  first_name: 'Admin',
  last_name: 'Connamara',
  work_phone: null,
  onboarding_status: onboardingStatus.PASSWORD,
  type: userRole.CLEARED,

  company_name: 'Smiley Trading Co',
  company_address: '123 Sesame St.',
  company_city: 'New York',
  company_state: 'NY',
  company_zipcode:  '10101',

  business_unit: {
    name: 'Unit Five',
    clearing_accounts: [
      {
        id: 1,
        t7_account: 'Clearing Account #1',
      },
      {
        id: 1,
        t7_account: 'Clearing Account #2',
      }
    ],
  },
};
