import {Severity} from 'allure-js-commons';
import {test} from '@playwright/test';

export const severity = {
  blocker () {
    test.info ().annotations.push ({
      type: 'severity',
      description: Severity.BLOCKER,
    });
  },

  critical () {
    test.info ().annotations.push ({
      type: 'severity',
      description: Severity.CRITICAL,
    });
  },

  normal () {
    test.info ().annotations.push ({
      type: 'severity',
      description: Severity.NORMAL,
    });
  },

  minor () {
    test.info ().annotations.push ({
      type: 'severity',
      description: Severity.MINOR,
    });
  },

  trivial () {
    test.info ().annotations.push ({
      type: 'severity',
      description: Severity.TRIVIAL,
    });
  },
};
