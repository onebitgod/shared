import { Application } from '../constants.js';
import { AppointmentType } from './appointment.js';
import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  application: {
    type: String,
    enum: [Application.merchant, Application.BUSINESS, Application.CUSTOMER],
  },
  name: {
    unique: true,
    required: true,
    type: String,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
  themeData: {
    brightness: {
      type: String,
      enum: ['dark', 'light'],
      default: 'light',
    },
    primaryColor: {
      type: String,
      default: '#000000',
    },
    primaryColorLight: {
      type: String,
      default: '#000000',
    },
    primaryColorDark: {
      type: String,
      default: '#000000',
    },
    accentColor: {
      type: String,
      default: '#000000',
    },
    shadowColor: {
      type: String,
      default: '#000000',
    },
    scaffoldBackgroundColor: {
      type: String,
      default: '#000000',
    },
    dividerColor: {
      type: String,
      default: '#000000',
    },
    button1: {
      color: {
        type: String,
        default: '#000000',
      },
      fontSize: {
        type: Number,
        default: 12,
      },
      inactiveColor: {
        type: String,
        default: '#000000',
      },
      inactiveFontColor: {
        type: String,
        default: '#000000',
      },
      fontColor: {
        type: String,
        default: '#000000',
      },
      inactiveBorderColor: {
        type: String,
        default: '#000000',
      },
      borderColor: {
        type: String,
        default: '#000000',
      },
    },
    button2: {
      color: {
        type: String,
        default: '#000000',
      },
      fontSize: {
        type: Number,
        default: 12,
      },
      inactiveColor: {
        type: String,
        default: '#000000',
      },
      inactiveFontColor: {
        type: String,
        default: '#000000',
      },
      fontColor: {
        type: String,
        default: '#000000',
      },
      inactiveBorderColor: {
        type: String,
        default: '#000000',
      },
      borderColor: {
        type: String,
        default: '#000000',
      },
    },
    card1: {
      backgroundColor: {
        type: String,
        default: '#000000',
      },
      borderColor: {
        type: String,
        default: '#000000',
      },
    },
    card2: {
      backgroundColor: {
        type: String,
        default: '#000000',
      },
      borderColor: {
        type: String,
        default: '#000000',
      },
    },
    backgroundColor: {
      type: String,
      default: '#000000',
    },
    fontFamily: {
      type: String,
      default: null,
    },
    appBar: {
      color: {
        type: String,
        default: '#000000',
      },
      titleSize: {
        type: Number,
        default: 12,
      },
      titleColor: {
        type: String,
        default: '#000000',
      },
      iconSize: {
        type: Number,
        default: 12,
      },
      iconColor: {
        type: String,
        default: '#000000',
      },
    },
    bottomAppBar: {
      backgroundColor: {
        type: String,
        default: '#000000',
      },
      labelColor: {
        type: String,
        default: '#000000',
      },
      labelSize: {
        type: Number,
        default: 12,
      },
      activeLabelColor: {
        type: String,
        default: '#000000',
      },
      activeLabelSize: {
        type: Number,
        default: 12,
      },
      iconColor: {
        type: String,
        default: '#000000',
      },
      iconSize: {
        type: Number,
        default: 12,
      },
      activeIconColor: {
        type: String,
        default: '#000000',
      },
      activeIconSize: {
        type: Number,
        default: 12,
      },
    },
    bodyText1: {
      fontSize: {
        type: Number,
        default: 12,
      },
      fontColor: {
        type: String,
        default: '#000000',
      },
    },
    bodyText2: {
      fontSize: {
        type: Number,
        default: 12,
      },
      fontColor: {
        type: String,
        default: '#000000',
      },
    },
    bodyText3: {
      fontSize: {
        type: Number,
        default: 12,
      },
      fontColor: {
        type: String,
        default: '#000000',
      },
    },
    heading1: {
      fontSize: {
        type: Number,
        default: 12,
      },
      fontColor: {
        type: String,
        default: '#000000',
      },
    },
    heading2: {
      fontSize: {
        type: Number,
        default: 12,
      },
      fontColor: {
        type: String,
        default: '#000000',
      },
    },
    heading3: {
      fontSize: {
        type: Number,
        default: 12,
      },
      fontColor: {
        type: String,
        default: '#000000',
      },
    },
    subtitle1: {
      fontSize: {
        type: Number,
        default: 12,
      },
      fontColor: {
        type: String,
        default: '#000000',
      },
    },
    subtitle2: {
      fontSize: {
        type: Number,
        default: 12,
      },
      fontColor: {
        type: String,
        default: '#000000',
      },
    },
    subtitle3: {
      fontSize: {
        type: Number,
        default: 12,
      },
      fontColor: {
        type: String,
        default: '#000000',
      },
    },
    inactiveTextfield1: {
      labelText: {
        fontSize: {
          type: Number,
          default: 12,
        },
        fontColor: {
          type: String,
          default: '#000000',
        },
      },
      hintText: {
        fontSize: {
          type: Number,
          default: 12,
        },
        fontColor: {
          type: String,
          default: '#000000',
        },
      },
      text: {
        fontSize: {
          type: Number,
          default: 12,
        },
        fontColor: {
          type: String,
          default: '#000000',
        },
      },
      prefix: {
        color: {
          type: String,
          default: '#000000',
        },
        size: {
          type: Number,
          default: 12,
        },
      },
      suffix: {
        color: {
          type: String,
          default: '#000000',
        },
        size: {
          type: Number,
          default: 12,
        },
      },
      fillColor: {
        type: String,
        default: '#000000',
      },
      borderColor: {
        type: String,
        default: '#000000',
      },
      cursorColor: {
        type: String,
        default: '#000000',
      },
    },
    inactiveTextfield2: {
      labelText: {
        fontSize: {
          type: Number,
          default: 12,
        },
        fontColor: {
          type: String,
          default: '#000000',
        },
      },
      hintText: {
        fontSize: {
          type: Number,
          default: 12,
        },
        fontColor: {
          type: String,
          default: '#000000',
        },
      },
      text: {
        fontSize: {
          type: Number,
          default: 12,
        },
        fontColor: {
          type: String,
          default: '#000000',
        },
      },
      prefix: {
        color: {
          type: String,
          default: '#000000',
        },
        size: {
          type: Number,
          default: 12,
        },
      },
      suffix: {
        color: {
          type: String,
          default: '#000000',
        },
        size: {
          type: Number,
          default: 12,
        },
      },
      fillColor: {
        type: String,
        default: '#000000',
      },
      borderColor: {
        type: String,
        default: '#000000',
      },
      cursorColor: {
        type: String,
        default: '#000000',
      },
    },
    activeTextfield1: {
      labelText: {
        fontSize: {
          type: Number,
          default: 12,
        },
        fontColor: {
          type: String,
          default: '#000000',
        },
      },
      hintText: {
        fontSize: {
          type: Number,
          default: 12,
        },
        fontColor: {
          type: String,
          default: '#000000',
        },
      },
      text: {
        fontSize: {
          type: Number,
          default: 12,
        },
        fontColor: {
          type: String,
          default: '#000000',
        },
      },
      prefix: {
        color: {
          type: String,
          default: '#000000',
        },
        size: {
          type: Number,
          default: 12,
        },
      },
      suffix: {
        color: {
          type: String,
          default: '#000000',
        },
        size: {
          type: Number,
          default: 12,
        },
      },
      fillColor: {
        type: String,
        default: '#000000',
      },
      cursorColor: {
        type: String,
        default: '#000000',
      },
      borderColor: {
        type: String,
        default: '#000000',
      },
    },
    activeTextfield2: {
      labelText: {
        fontSize: {
          type: Number,
          default: 12,
        },
        fontColor: {
          type: String,
          default: '#000000',
        },
      },
      hintText: {
        fontSize: {
          type: Number,
          default: 12,
        },
        fontColor: {
          type: String,
          default: '#000000',
        },
      },
      text: {
        fontSize: {
          type: Number,
          default: 12,
        },
        fontColor: {
          type: String,
          default: '#000000',
        },
      },
      prefix: {
        color: {
          type: String,
          default: '#000000',
        },
        size: {
          type: Number,
          default: 12,
        },
      },
      suffix: {
        color: {
          type: String,
          default: '#000000',
        },
        size: {
          type: Number,
          default: 12,
        },
      },
      fillColor: {
        type: String,
        default: '#000000',
      },
      cursorColor: {
        type: String,
        default: '#000000',
      },
      borderColor: {
        type: String,
        default: '#000000',
      },
    },
  },
});

const AppTheme = mongoose.model('appTheme', schema);

export default AppTheme;
