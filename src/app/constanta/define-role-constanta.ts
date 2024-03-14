const RoleEmpty = {
  USER: {},
  SM_USER: {},
  VP_USER: {},
  TAB: {},
  SM_TAB: {},
  TAP: {},
  SM_TAP: {},
  TAM: {},
  SM_TAM: {},
  VP_TA: {},
  TXC_3: {},
  SM_TXC: {},
  VP_TX: {},
  DF: {},
  DT: {},
};

const phase = {
  1: {},
  2: {},
  3: {},
  4: {},
  5: {},
  6: {},
  7: {},
  8: {},
  9: {},
  10: {},
  11: {},
  12: {},
  13: {},
};

export const DataByRole = {
  createRealizationViewed: {
    1: {
      save: {
        USER: {
          config: {
            button: {
              save: true,
              submit: true,
            },
          },
          statusId: 1,
          statusToId: 2,
          status: 'OPEN',
        },
      },
    },
    2: {
      submit: {
        USER: {
          config: {
            button: {},
          },
          statusId: 2,
          statusToId: 3,
          status: 'OPEN',
        },
        3: {
          as: 'REQUESTER',
          config: {
            button: {
              reject: true,
              revise: true,
              confirm: true,
              preview: true,
            },
          },
        },
      },
    },
  },
  needApprovalViewed: {
    1: {
      save: {
        USER: {
          config: {
            button: {
              save: true,
              submit: true,
              edit: true,
              editRealokasi: true,
              preview: true,
            },
          },
          statusId: '1',
          statusToId: '2',
          status: 'OPEN',
        },
      },
      editRealokasi: {
        USER: {
          config: {
            button: {
              save: true,
              submit: true,
              edit: true,
              editRealokasi: true,
              preview: true,
            },
          },
        },
        statusId: '1',
        statusToId: '2',
        status: 'OPEN',
      },
      edit: {
        USER: {
          config: {
            button: {
              save: true,
              submit: true,
              edit: true,
              editRealokasi: true,
              preview: true,
            },
          },
        },
        statusId: '1',
        statusToId: '2',
        status: 'OPEN',
      },
      preview: {
        USER: {
          config: {
            button: {
              save: true,
              submit: true,
              edit: true,
              editRealokasi: true,
              preview: true,
            },
          },
        },
        statusId: '1',
        status: 'OPEN',
      },
    },
    2: {
      submit: {
        USER: {
          config: {
            button: {},
          },
          statusId: '2',
          statusToId: '3',
          status: 'OPEN',
        },
        3: {
          as: 'REQUESTER',
          config: {
            button: {
              reject: true,
              revise: true,
              confirm: true,
              preview: true,
            },
          },
        },
      },
    },
    3: {
      reject: {
        // OK
        USER: {},
        SM_USER: { status: 'Reject', statusId: '3' },
      },
      revise: {
        USER: {
          config: {
            button: {
              edit: true,
              editRealokasi: true,
              save: true,
              submit: true,
              preview: true,
            },
          },
          status: 'Revise',
          statusId: '3',
          statusToId: '1',
        },
      },
      confirm: {
        SM_USER: {
          config: {
            button: {},
          },
          status: 'OPEN',
          statusId: '3',
          statusToId: '4',
        },
        4: {
          as: 'REQUESTER',
          config: {
            button: {
              reject: true,
              revise: true,
              confirm: true,
              preview: true,
            },
          },
        },
      },
      preview: {
        SM_USER: {
          config: {
            button: {
              reject: true,
              revise: true,
              confirm: true,
              preview: true,
            },
          },
        },
        statusId: '3',
        status: 'OPEN',
      },
    },
    4: {
      reject: {
        USER: {},
        SM_USER: {},
        VP_USER: { status: 'Reject', statusId: '4' },
      },
      revise: {
        USER: {
          config: {
            button: {
              edit: true,
              editRealokasi: true,
              save: true,
              submit: true,
              preview: true,
            },
          },
          status: 'Revise',
          statusId: '4',
          statusToId: '1',
        },
      },
      confirm: {
        VP_USER: {
          config: {
            button: {},
          },
          status: 'OPEN',
          statusId: '4',
          statusToId: '5',
        },
        5: {
          as: 'REQUESTER',
          config: {
            button: {
              reject: true,
              revise: true,
              confirm: true,
              preview: true,
            },
          },
        },
      },
      preview: {
        VP_USER: {
          config: {
            button: {
              reject: true,
              revise: true,
              confirm: true,
              preview: true,
            },
          },
        },
        statusId: '4',
        status: 'OPEN',
      },
    },
    5: {
      rejectTAB: {
        // OK
        USER: {},
        SM_USER: {},
        VP_USER: {},
        TAB: { status: 'Reject', statusId: '5' },
      },
      rejectTAM: {
        // OK
        USER: {},

        SM_USER: {},
        VP_USER: {},
        TAM: { status: 'Reject', statusId: '5' },
      },
      rejectTAP: {
        // OK
        USER: {},

        SM_USER: {},
        VP_USER: {},
        TAP: { status: 'Reject', statusId: '5' },
      },
      revise: {
        USER: {
          config: {
            button: {
              edit: true,
              editRealokasi: true,
              save: true,
              submit: true,
              preview: true,
            },
          },
          status: 'Revise',
          statusId: '5',
          statusToId: '1',
        },
      },
      confirmSMTAB: {
        SM_TAB: {
          config: {
            button: {},
          },
          status: 'PROGRESS',
          statusId: '5',
          statusToId: '6',
        },
        6: {
          as: 'REQUESTER',
          config: {
            button: {
              reject: true,
              revise: true,
              approve: true,
              preview: true,
            },
          },
        },
      },
      confirmSMTAP: {
        SM_TAP: {
          config: {
            button: {},
          },
          status: 'PROGRESS',
          statusId: '5',
          statusToId: '6',
        },
        6: {
          as: 'REQUESTER',
          config: {
            button: {
              revise: true,
              confirm: true,
              preview: true,
            },
          },
        },
      },
      confirmSMTAM: {
        SM_TAM: {
          config: {
            button: {},
          },
          status: 'PROGRESS',
          statusId: '5',
          statusToId: '6',
        },
        6: {
          as: 'REQUESTER',
          config: {
            button: {
              preview: true,
            },
          },
        },
      },
      previewTAM: {
        USER: {
          config: {
            button: {
              preview: true,
            },
          },
        },
        statusId: '5',
        status: 'OPEN',
      },
      previewTAB: {
        USER: {
          config: {
            button: {
              reject: true,
              revise: true,
              approve: true,
              takeProject: true,
              untakeProject: true,
              needHPS: true,
              preview: true,
            },
          },
        },
        statusId: '5',
        status: 'OPEN',
      },
      previewTAP: {
        USER: {
          config: {
            button: {
              reject: true,
              revise: true,
              approve: true,
              preview: true,
            },
          },
        },
        statusId: '5',
        status: 'OPEN',
      },
    },
    6: {
      rejectSMTAB: {
        // OK
        USER: {},
        SM_USER: {},
        VP_USER: {},
        TAB: {},
        SM_TAB: { status: 'Reject', statusId: '6' },
      },
      rejectSMTAM: {
        // OK
        USER: {},
        SM_USER: {},
        VP_USER: {},
        TAM: {},
        SM_TAM: { status: 'Reject', statusId: '6' },
      },
      rejectSMTAP: {
        // OK
        USER: {},
        SM_USER: {},
        VP_USER: {},
        TAP: {},
        SM_TAP: { status: 'Reject', statusId: '6' },
      },
      revise: {
        USER: {
          config: {
            button: {
              edit: true,
              editRealokasi: true,
              save: true,
              submit: true,
              preview: true,
            },
          },
          status: 'Revise',
          statusId: '6',
          statusToId: '1',
        },
      },
      confirmSMTAP: {
        SM_TAP: {
          config: {
            button: {},
          },
          status: 'PROGRESS',
          statusId: '6',
          statusToId: '7',
        },
        7: {
          as: 'REQUESTER',
          config: {
            button: {
              reject: true,
              revise: true,
              approve: true,
              preview: true,
            },
          },
        },
      },
      confirmSMTAM: {
        SM_TAM: {
          config: {
            button: {},
          },
          status: 'PROGRESS',
          statusId: '6',
          statusToId: '7',
        },
        7: {
          as: 'REQUESTER',
          config: {
            button: {
              reject: true,
              revise: true,
              approve: true,
              preview: true,
            },
          },
        },
      },
      confirmSMTAB: {
        SM_TAB: {
          config: {
            button: {},
          },
          status: 'PROGRESS',
          statusId: '6',
          statusToId: '7',
        },
        7: {
          as: 'REQUESTER',
          config: {
            button: {
              reject: true,
              revise: true,
              approve: true,
              preview: true,
            },
          },
        },
      },
      previewSM_TAB: {
        SM_TAB: {
          config: {
            button: {
              reject: true,
              revise: true,
              approve: true,
              preview: true,
            },
          },
        },

        statusId: '6',
        status: 'OPEN',
      },
      previewSM_TAM: {
        SM_TAM: {
          config: {
            button: {
              preview: true,
            },
          },
        },

        statusId: '6',
        status: 'OPEN',
      },
      previewSM_TAP: {
        SM_TAM: {
          config: {
            button: {
              preview: true,
              revise: true,
            },
          },
        },

        statusId: '6',
        status: 'OPEN',
      },
    },
    7: {
      rejectVPTA_TAB: {
        USER: {},

        SM_USER: {},
        VP_USER: {},
        TAB: {},
        SM_TAB: {},
        VP_TA: { status: 'Reject', statusId: '7' },
      },
      rejectVPTA_TAM: {
        USER: {},

        SM_USER: {},
        VP_USER: {},
        TAM: {},
        SM_TAM: {},
        VP_TA: { status: 'Reject', statusId: '7' },
      },
      rejectVPTA_TAP: {
        USER: {},

        SM_USER: {},
        VP_USER: {},
        TAP: {},
        SM_TAP: {},
        VP_TA: { status: 'Reject', statusId: '7' },
      },
      revise: {
        USER: {
          config: {
            button: {
              edit: true,
              editRealokasi: true,
              save: true,
              submit: true,
              preview: true,
            },
          },
          status: 'Revise',
          statusId: '7',
          statusToId: '1',
        },
        TAB: {
          config: {
            button: {
              reject: true,
              revise: true,
              approve: true,
              takeProject: true,
              untakeProject: true,
              needHPS: true,
              preview: true,
            },
          },
          status: 'Revise',
          statusId: '7',
          statusToId: '5',
        },
      },
      confirm: {
        VP_TA: {
          config: {
            button: {},
          },
          status: 'PROGRESS',
          statusId: '7',
          statusToId: '8',
        },
        8: {
          as: 'REQUESTER',
          config: {
            button: {
              reject: true,
              revise: true,
              takeProject: true,
              untakeProject: true,
              needHPS: true,
              preview: true,
              confirm: true,
            },
          },
        },
      },
      preview: {
        VP_TA: {
          config: {
            button: {
              reject: true,
              revise: true,
              approve: true,
              preview: true,
            },
          },
        },
        statusId: '7',
        status: 'OPEN',
      },
    },
    8: {
      rejectTXC_TAB: {
        USER: {},

        SM_USER: {},
        VP_USER: {},
        TAB: {},
        SM_TAB: {},
        VP_TA: {},
        TXC_3: { status: 'Reject', statusId: '8' },
      },
      rejectTXC_TAM: {
        USER: {},

        SM_USER: {},
        VP_USER: {},
        TAM: {},
        SM_TAM: {},
        VP_TA: {},
        TXC_3: { status: 'Reject', statusId: '8' },
      },
      rejectTXC_TAP: {
        USER: {},

        SM_USER: {},
        VP_USER: {},
        TAP: {},
        SM_TAP: {},
        VP_TA: {},
        TXC_3: { status: 'Reject', statusId: '8' },
      },
      revise: {
        USER: {
          config: {
            button: {
              edit: true,
              editRealokasi: true,
              save: true,
              submit: true,
              preview: true,
            },
          },
          status: 'Revise',
          statusId: '8',
          statusToId: '1',
        },
        TAB: {
          config: {
            button: {
              reject: true,
              revise: true,
              approve: true,
              takeProject: true,
              untakeProject: true,
              needHPS: true,
              preview: true,
            },
          },
          status: 'Revise',
          statusId: '8',
          statusToId: '6',
        },
      },
      confirm: {
        TXC_3: {
          config: {
            button: {},
          },
          status: 'PROGRESS',
          statusId: '8',
          statusToId: '9',
        },
        9: {
          as: 'REQUESTER',
          config: {
            button: {
              reject: true,
              revise: true,
              preview: true,
              approve: true,
            },
          },
        },
      },
      preview: {
        TXC_3: {
          config: {
            button: {
              reject: true,
              revise: true,
              takeProject: true,
              untakeProject: true,
              needHPS: true,
              preview: true,
              confirm: true,
            },
          },
        },
        statusId: '8',
        status: 'OPEN',
      },
    },
    9: {
      rejectSMTXC_TAB: {
        USER: {},

        SM_USER: {},
        VP_USER: {},
        TAB: {},
        SM_TAB: {},
        VP_TA: {},
        TXC_3: {},
        SM_TXC: { status: 'Reject', statusId: '9' },
      },
      rejectSMTXC_TAM: {
        USER: {},

        SM_USER: {},
        VP_USER: {},
        TAM: {},
        SM_TAM: {},
        VP_TA: {},
        TXC_3: {},
        SM_TXC: { status: 'Reject', statusId: '9' },
      },
      rejectSMTXC_TAP: {
        USER: {},

        SM_USER: {},
        VP_USER: {},
        TAP: {},
        SM_TAP: {},
        VP_TA: {},
        TXC_3: {},
        SM_TXC: {
          status: 'Reject',
          statusId: '9',
        },
      },
      revise: {
        USER: {
          config: {
            button: {
              edit: true,
              editRealokasi: true,
              save: true,
              submit: true,
              preview: true,
            },
          },
          status: 'Revise',
          statusId: '9',
          statusToId: '1',
        },
        TAB: {
          config: {
            button: {
              reject: true,
              revise: true,
              approve: true,
              takeProject: true,
              untakeProject: true,
              needHPS: true,
              preview: true,
            },
          },
          status: 'Revise',
          statusId: '9',
          statusToId: '6',
        },
        TXC_3: {
          config: {
            button: {
              reject: true,
              revise: true,
              confirm: true,
              takeProject: true,
              untakeProject: true,
              needHPS: true,
              preview: true,
            },
          },
          status: 'Revise',
          statusId: '9',
          statusToId: '8',
        },
      },
      confirm: {
        SM_TXC: {
          config: {
            button: {},
          },
          status: 'PROGRESS',
          statusId: '9',
          statusToId: '10',
        },
        10: {
          as: 'REQUESTER',
          config: {
            button: {
              reject: true,
              revise: true,
              preview: true,
              approve: true,
            },
          },
        },
      },
      preview: {
        SM_TX: {
          config: {
            button: {
              reject: true,
              revise: true,
              approve: true,
              preview: true,
            },
          },
        },
        statusId: '9',
        status: 'PROGRESS',
      },
    },

    10: {
      rejectVPTX_TAB: {
        USER: {},

        SM_USER: {},
        VP_USER: {},
        TAB: {},
        SM_TAB: {},
        VP_TA: {},
        TXC_3: {},
        SM_TXC: {},
        VP_TX: {
          status: 'Reject',
          statusId: '10',
        },
      },
      rejectVPTX_TAM: {
        USER: {},

        SM_USER: {},
        VP_USER: {},
        TAM: {},
        SM_TAM: {},
        VP_TA: {},
        TXC_3: {},
        SM_TXC: {},
        VP_TX: {
          status: 'Reject',
          statusId: '10',
        },
      },
      rejectVPTX_TAP: {
        USER: {},

        SM_USER: {},
        VP_USER: {},
        TAP: {},
        SM_TAP: {},
        VP_TA: {},
        TXC_3: {},
        SM_TXC: {},
        VP_TX: {
          status: 'Reject',
          statusId: '10',
        },
      },
      revise: {
        USER: {
          config: {
            button: {
              edit: true,
              editRealokasi: true,
              save: true,
              submit: true,
              preview: true,
            },
          },
          status: 'Revise',
          statusId: '10',
          statusToId: '1',
        },
        TAB: {
          config: {
            button: {
              reject: true,
              revise: true,
              approve: true,
              takeProject: true,
              untakeProject: true,
              needHPS: true,
              preview: true,
            },
          },
          status: 'Revise',
          statusId: '10',
          statusToId: '6',
        },
        TXC_3: {
          config: {
            button: {
              reject: true,
              revise: true,
              confirm: true,
              takeProject: true,
              untakeProject: true,
              needHPS: true,
              preview: true,
            },
          },
          status: 'Revise',
          statusId: '10',
          statusToId: '8',
        },
      },
      confirmVP_TX: {
        VP_TX: {
          config: {
            button: {},
          },
          status: 'PROGRESS',
          statusId: '10',
          statusToId: '11',
        },
        11: {
          as: 'REQUESTER',
          config: {
            button: {
              reject: true,
              revise: true,
              preview: true,
              approve: true,
            },
          },
        },
        confirmVP_TX: {
          VP_TX: {
            config: {
              button: {},
            },
            status: 'CLOSED',
            statusId: '10',
          },
        },
      },
      preview: {
        VP_TX: {
          config: {
            button: {
              reject: true,
              revise: true,
              approve: true,
              preview: true,
            },
          },
        },
        statusId: '10',
        status: 'PROGRESS',
      },
    },
    11: {
      rejectDF_TAB: {
        USER: {},

        SM_USER: {},
        VP_USER: {},
        TAB: {},
        SM_TAB: {},
        VP_TA: {},
        TXC_3: {},
        SM_TXC: {},
        VP_TX: {},
        DF: {
          status: 'Reject',
          statusId: '11',
        },
      },
      rejectDF_TAM: {
        USER: {},

        SM_USER: {},
        VP_USER: {},
        TAM: {},
        SM_TAM: {},
        VP_TA: {},
        TXC_3: {},
        SM_TXC: {},
        VP_TX: {},
        DF: {
          status: 'Reject',
          statusId: '11',
        },
      },
      rejectDF_TAP: {
        USER: {},

        SM_USER: {},
        VP_USER: {},
        TAP: {},
        SM_TAP: {},
        VP_TA: {},
        TXC_3: {},
        SM_TXC: {},
        VP_TX: {},
        DF: {
          status: 'Reject',
          statusId: '11',
        },
      },
      revise: {
        USER: {
          config: {
            button: {
              edit: true,
              editRealokasi: true,
              save: true,
              submit: true,
              preview: true,
            },
          },
          status: 'Revise',
          statusId: '11',
          statusToId: '1',
        },
        TAB: {
          config: {
            button: {
              reject: true,
              revise: true,
              approve: true,
              takeProject: true,
              untakeProject: true,
              needHPS: true,
              preview: true,
            },
          },
          status: 'Revise',
          statusId: '11',
          statusToId: '6',
        },
        TXC_3: {
          config: {
            button: {
              reject: true,
              revise: true,
              confirm: true,
              takeProject: true,
              untakeProject: true,
              needHPS: true,
              preview: true,
            },
          },
          status: 'Revise',
          statusId: '11',
          statusToId: '9',
        },
      },
      confirm: {
        DF: {
          config: {
            button: {},
          },
          status: 'CLOSED',
          statusId: '11',
        },
      },
      preview: {
        DF: {
          config: {
            button: {
              reject: true,
              revise: true,
              approve: true,
              preview: true,
            },
          },
        },
        statusId: '11',
        status: 'PROGRESS',
      },
    },
  },
  createReallocationGeneral: {},
};
