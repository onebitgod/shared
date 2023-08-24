import { getS3Url } from "shared/index.js";
import { Application, ObjectId } from "../constants.js";
import mongoose from "mongoose";

export const TicketStatus = {
  UNASSIGNED: "unassigned",
  UNRESOLVED: "unresolved",
  RESOLVED: "Resolved",
  CLOSED: "closed",
};

export const TicketCategory = {
  TRANSACTION: "transaction",
  SETTLEMENT: "settlement",
  PAYMENT: "payment",
  BUYGOLD: "buygold",
  SELLGOLD: "sellgold",
};

let ticketUpdates = new mongoose.Schema(
  {
    updateBy: { type: String, enum: ["user", "support"] },
    message: { type: String },
    attachments: [
      {
        url: { type: String },
        mimeType: { type: String },
      },
    ],
  },
  { timestamps: true, _id: true, id: false }
);

const schema = new mongoose.Schema(
  {
    account: { type: ObjectId, ref: "account" },
    assignedTo: { type: ObjectId, ref: "adminUser" },
    assignedBy: { type: ObjectId, ref: "adminUser" },
    ticketId: {
      type: String,
      unique: true,
    },
    application: {
      type: String,
      enum: [Application.BUSINESS, Application.CUSTOMER, Application.MERCHANT],
    },
    subject: { type: String },
    body: { type: String },
    date: {
      type: Date,
    },
    category: {
      type: String,
    },
    ticketUpdates: [ticketUpdates],
    status: {
      type: String,
      default: TicketStatus.UNASSIGNED,
      enum: [
        TicketStatus.UNASSIGNED,
        TicketStatus.UNRESOLVED,
        TicketStatus.RESOLVED,
        TicketStatus.CLOSED,
      ],
    },
    closedDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

// @ts-ignore
schema.pre("save", function (next) {
  if (this.isNew) {
    this.ticketId = generateTicketId();
  }
  next();
});

const Ticket = mongoose.model("ticket", schema);

export default Ticket;

function generateTicketId() {
  const now = new Date();
  const year = now.getFullYear().toString().substr(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const milliseconds = now.getMilliseconds().toString().padStart(3, "0");
  return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
}
