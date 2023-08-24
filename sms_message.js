export const otpMessage = (otp) => {
  return `BKSMyGold Login OTP: ${otp} Valid for 3 minutes. If the OTP was not requested by you, reply with "Not Me"`;
};

export const sellGold = ({ gold, amount, link }) => {
  return `BKSMyGold Sell Gold detail: Gold: ${gold} g Rs. ${amount} Purchase Invoice and the Custody Release Certificate: ${link}`;
};

// whatever i changed here :-

export const buyInstantGoldUser = ({ gold, amount, link }) => {
  return `BKSMyGold Buy Gold detail: Gold: ${gold} g Rs. ${amount} Sale Invoice and the Custody Certificate: ${link}`;
};

export const Cancel_of_plan_merchant = ({ gip_id, user }) => {
  return `BKSMyGold GIP ${gip_id} has been canceled by the user ${user}`;
};

export const Every_month_Installment_Alert = ({ plan_id, days, link }) => {
  return `BKSMyGold Investment Plan ${plan_id} : ${days} days left to pay your monthly installment! Make the payment here: ${link}`;
};

export const Every_month_lease_interest_earned = ({ plan_id, amount, link }) => {
  return `BKSMyGold Investment Plan ${plan_id} : Gold Interest Credited: ${amount} grams Sale Invoice and Custody Certificate: ${link}`;
};

export const skip_payment_paid_back_same_month_release_of_hold_gold = ({ plan_id, gold, amount, link }) => {
  return `BKSMyGold Investment Plan ${plan_id} : Installment for ${amount} has been successfully paid! ${gold} g Gold held against the installment has been released. MyGold Bank: ${link}`;
};

export const Unpaid_Investment = ({ plan_id, amount, link }) => {
  return `BKSMyGold Investment Plan ${plan_id} : Monthly installment of ${amount} has not been paid, to avoid cancellation, please make the payment soon! Make Payment: ${link}`;
};

export const Pre_Installment_paid = ({ plan_id, date, amount }) => {
  return `BKSMyGold Investment Plan ${plan_id} : Monthly installments pre-paid till: ${date} Due payment: ${amount} (Due balance to be deducted from the total payable amount)`;
};

export const Unpaid_Skip = ({ plan_id, days, date, link }) => {
  return `BKSMyGold Investment Plan ${plan_id} : Only ${days} days left! Pay your monthly before ${date} to continue enjoying plan benefits! Make payment: ${link}`;
};

export const Skip_Applied = ({ plan_id, skip_cur, skips_left }) => {
  return `BKSMyGold Investment Plan ${plan_id} : Skip no: ${skip_cur} successfully applied! ${skips_left} skips left. Remember to make the payment of your Monthly Installment by the end of this month.`;
};

export const Every_month_installment_paid = ({ plan_id, link }) => {
  return `BKSMyGold Investment Plan ${plan_id} : Your monthly installment has been paid successfully! Find the Sale Invoice and Custody Certificate here: ${link}`;
};

export const Login_OTP_User = ({ otp, time }) => {
  return `BKSMyGold Login OTP: ${otp} Valid for ${time} minutes. If the OTP was not requested by you, reply with "Not Me"`;
};

export const Order_Return_Process_started = ({ order_id }) => {
  return `BKSMyGold order ${order_id} return has been initiated. We will collect the package soon. If this wasn't you, reply with "Raise a ticket".`;
};

export const Order_Delivered = ({ order_id, link }) => {
  return `BKSMyGold order number ${order_id} has been delivered. Order Details: ${link}`;
};

export const Order_placed = ({ order_id, link }) => {
  return `BKSMyGold Order number ${order_id} has been placed. Purchase Invoice, Custody Release Certificate, and Order Purchase Invoice: ${link}`;
};

export const Order_Cancelled = ({ order_id, link }) => {
  return `BKSMyGold order number ${order_id} has been successfully canceled. If you think this was a mistake, please reply with "Raise a ticket". Order Details: ${link}`;
};

export const Order_InTransit = ({ order_id, link }) => {
  return `BKSMyGold order number ${order_id} is now in transit. Track order: ${link}`;
};

export const Sell_Instant_Gold_User = ({ gold, amount, link }) => {
  return `BKSMyGold Sell Gold detail: Gold: ${gold} g Rs. ${amount} Purchase Invoice and the Custody Release Certificate: ${link}`;
};

export const Gold_credited_to_gold_bank_business = ({ gold, settlement_no, user, credited_amt, total_amt }) => {
  return `BKSMyGold Update: ${gold} Gold has been credited to your MyGold account against settlement number ${settlement_no} with user ${user} Credited Amount: ${credited_amt} Total Amount ${total_amt}`;
};

export const Gold_Received_by_refiner_merchant = ({ gold, appointment_no }) => {
  return `BKSMyGold Update: ${gold} grams of Gold collected from verifier appointment number ${appointment_no} has been received by the refiner partner.`;
};

export const Gold_verifier_to_refiner_merchant = ({ gold, appointment_no }) => {
  return `BKSMyGold Update: ${gold} grams of Gold collected from verifier appointment number ${appointment_no} has been sent to the refiner partner.`;
};

export const Notify_customer_after_12_months_merchant = ({ gold, transac_no }) => {
  return `BKSMyGold Update: ${gold} grams of Gold have been purchased into your Custody against transaction number ${transac_no} Purchase Invoice and the Release of Custody`;
};

export const Gold_Reached_hub_MERCHANT = ({ gold, gold_label, date }) => {
  return `BKSMyGold Update: ${gold} grams of Gold, coded ${gold_label} have been delivered at your custody from the refiner partner on ${date}`;
};

export const Refiner_Gold_bars_sent_to_Hub_merchant = ({ gold, gold_label, date }) => {
  return `BKSMyGold Update: ${gold} grams of Gold, coded ${gold_label} have been delivered at your MyGold Hub from the refiner partner on ${date} :`;
};

export const Handover_and_manager_verified_gold_merchant = ({ gold, gold_label, time }) => {
  return `BKSMyGold Update: ${gold} grams of Gold, coded ${gold_label} will reach your custody from the refiner partner between ${time}`;
};

export const Advance_received_verifications_captain = ({ amount, user, date, time }) => {
  return `BKSMyGold Update: Advance worth Rs. ${amount} has been received for MyGold Verifier Appointment for user ${user} Date: ${date} Timings: ${time}`;
};

export const Order_Placed_captain = ({ order_id, sku, username }) => {
  return `BKSMyGold Update: An order has been placed with you, kindly take the necessary action. Order Number: ${order_id} SKU: ${sku} Username: ${username}`;
};

export const Appointment_Canceled_merchant = ({ appointment_no, order_id, user }) => {
  return `BKSMyGold Update: Appointment number ${appointment_no} for ${order_id} has been canceled by user ${user}`;
};

export const Appointment_Rescheduled_merchant = ({ appointment_no, date, time, user }) => {
  return `BKSMyGold Update: Appointment number ${appointment_no} has been rescheduled to ${date} for user ${user} at ${time}`;
};

export const Plan_forfeited_notify_merchant = ({ gip_id, gold, user }) => {
  return `BKSMyGold Update: BKSMyGold GIP ${gip_id} has been forfeited. Username: ${user} Gold sold: ${gold}`;
};

export const Verifier_captain_started_captain = ({ captain_name, vehicle, appointment_no, time, user }) => {
  return `BKSMyGold Update: Captain ${captain_name} has started with vehicle ${vehicle} for Verifier Appointment ${appointment_no} initiated by user ${user} for date, time ${time}`;
};

export const Documents_verified_merchant = () => {
  return `BKSMyGold Update: Congratulation, your registration documents have been verified! You can now use all the features of your MyGold Merchant Account.`;
};

export const Gold_bars_checked_dispute_raised_merchant = ({ dispute, package_id, manager }) => {
  return `BKSMyGold Update: Dispute ${dispute} has been raised against package ${package_id} by MyGold Hub Manager ${manager}`;
};

// here verifier is a guess coz im not sure what it should be
export const Captain_checked_and_disputes_raised_merchant = ({ verifier, package_id, }) => {
  return `BKSMyGold Update: Dispute against package number ${package_id} has been raised against ${verifier}.`;
};

// for after order i guessed
export const Gold_bars_issue_merchant = ({ gold_label, order_id, user }) => {
  return `BKSMyGold Update: Gold bars ${gold_label} from MyGold Hub Reserve have been issued for purchase under order ${order_id} for ${user}`;
};

export const Gold_bars_in_safe_merchant = ({ package_id }) => {
  return `BKSMyGold Update: Gold bars from the package ${package_id} have been checked and submitted in the MyGold Hub Reserve.`;
};

export const Manager_checked_and_in_treasure_captain = ({ gold_unit, gold_amt }) => {
  return `BKSMyGold Update: Gold unit ${gold_unit} has been deposited in the treasury. You have reached your treasury limit, kindly transfer the Gold to the verifier as soon as possible. Gold amount in Treasury: ${gold_amt}`;
};

export const Order_packed_and_shipped_captain = ({ order_id, sku, username }) => {
  return `BKSMyGold Update: Order ${order_id} has been packed and shipped by the captain. SKU: ${sku} Username: ${username}`;
};

export const Scanned_and_in_refineries_CAPTAIN = ({ order_id, gold_wt, gold_rate }) => {
  return `BKSMyGold Update: Order ${order_id} have been checked and placed in the refinery custody. Gold Weight: ${gold_wt} Rate: ${gold_rate}`;
};

export const Order_Canceled_merchant = ({ order_id, sku, username }) => {
  return `BKSMyGold Update: Order number ${order_id} has been canceled by the user. Username: ${username} Order SKU: ${sku}`;
};

export const Order_Delivered_merchant = ({ order_id, sku, username }) => {
  return `BKSMyGold Update: Order number ${order_id} has been delivered. Username: ${username} Order SKU: ${sku}`;
};

export const Order_InTransit_merchant = ({ order_id, sku, username }) => {
  return `BKSMyGold Update: Order number ${order_id} is in transit. Username: ${username} Order SKU: ${sku}`;
};

export const Verifier_Start_OTP = ({ otp }) => {
  return `BKSMyGold Update: OTP for verifying process: ${otp} Please share this with your Verifier directly. Do not share this OTP with anyone else.`;
};

export const Check_Reorder_to_manager_captain = ({ order_id, otp, sku, username }) => {
  return `BKSMyGold Update: OTP to receive re-order ${order_id} is ${otp} Username: ${username} SKU: ${sku}`;
};

export const Verifier_orders_assigned_to_check_captain = ({ package_id, otp, gold_wt, gold_rate }) => {
  return `BKSMyGold Update: OTP to receive the verifier package ${package_id} is ${otp} Gold Weight: ${gold_wt} Rate: ${gold_rate}`;
};

export const Shipping_after_refining_and_packing_captain = ({ package_id, gold_wt, gold_rate }) => {
  return `BKSMyGold Update: Package ${package_id} has been refined, please package and ship it to the Gold Hub. Gold Weight: ${gold_wt} Rate: ${gold_rate}`;
};

export const Reassign_goldBars_to_captain = ({ package_id, gold_wt, gold_rate }) => {
  return `BKSMyGold Update: Package ${package_id} is awaiting refining, please refine and store the same in your custody. Gold Weight: ${gold_wt} Rate: ${gold_rate}`;
};

export const Box_reached_ready_to_assign_to_captain = ({ package_id, gold_wt, gold_rate }) => {
  return `BKSMyGold Update: Please assign a captain to check the arrived refiner package ${package_id} . Gold Weight: ${gold_wt} Rate: ${gold_rate}`;
};

export const Scan_verifier_orders_captain = ({ order_id, gold_wt, gold_rate }) => {
  return `BKSMyGold Update: Please assign a manager to scan the Verifier orders ${order_id} Gold Weight: ${gold_wt} Rate: ${gold_rate}`;
};

export const Reorders_to_be_assigned_and_checked_captain = ({ order_id, username, sku }) => {
  return `BKSMyGold Update: Please assign captain to check re-order ${order_id} Username: ${username} SKU: ${sku}`;
};

export const Reorders_return_placed_captain = ({ order_id, username, sku }) => {
  return `BKSMyGold Update: Please assign Captain to deliver re-order ${order_id} to the user. Username: ${username} SKU: ${sku}`;
};

export const Settlement_to_be_done_captain = ({ amount, time, transaction_no, username }) => {
  return `BKSMyGold Update: Please complete the settlement of Rs. ${amount} against transaction ${transaction_no} . Username: ${username} Timings: ${time}`;
};

export const Reorder_shipped_by_manager_pickup_captain = ({ order_id, username, sku }) => {
  return `BKSMyGold Update: Please initiate return of the re-order ${order_id} to deliver to the user. Username: ${username} SKU: ${sku}`;
};

export const Credit_funds_to_Customer_merchant = ({ order_id, amount, date }) => {
  return `BKSMyGold Update: Please make the payment of amount ${amount} to MyGold against Purchase ${order_id} by ${date}`;
};

export const Settlement_Notification_merchant = ({ settlement_no, username, date }) => {
  return `BKSMyGold Update: Please make your payment against settlement number ${settlement_no} before date: ${date} Details: Username: ${username}`;
};

export const Handover_refined_gold_to_manager_captain = ({ gold, gold_wt }) => {
  return `BKSMyGold Update: Please receive the refined Gold Bars and Balls ${gold} weighted ${gold_wt}`;
};

export const Handover_verified_gold_to_manager_captain = ({ package_id, captain_name, gold_wt, gold_rate }) => {
  return `BKSMyGold Update: Please receive the refiner package ${package_id} , as checked and approved by captain ${captain_name} . Gold Weight: ${gold_wt} Rate: ${gold_rate}`;
};

export const Refiner_package_to_be_received_captain = ({ package_id, gold_wt, gold_rate }) => {
  return `BKSMyGold Update: Please receive the refiner package ${package_id} , it has arrived at your facility. Gold Weight: ${gold_wt} Rate: ${gold_rate}`;
};

export const Verifier_package_to_be_received_captain = ({ package_id, gold_wt, gold_rate }) => {
  return `BKSMyGold Update: Please receive the Verifier package ${package_id} Gold Weight: ${gold_wt} Rate: ${gold_rate}`;
};

// i dont know this
export const Disclaimer_After_Melt = ({ link, disclaimer, idk }) => {
  return `BKSMyGold Update: Please submit your final approval to complete ${idk} procedure: ${link} Disclaimer: ${disclaimer}.`;
};

// i dont know this
export const Disclaimers_for_seal_after_accepting_upload_or_sell = ({ link, disclaimer, idk }) => {
  return `BKSMyGold Update: Please submit your final approval to complete the Gold ${idk} procedure: ${link} Disclaimer: ${disclaimer}`;
};

// doubt
export const Disclaimer_Before_melt = ({ link, disclaimer }) => {
  return `BKSMyGold Update: Please submit your final approval to complete the Gold melting procedure: ${link} Disclaimer: ${disclaimer}`;
};

export const Purchase_of_gold_captain = ({ gold_wt, user, gold_rate }) => {
  return `BKSMyGold Update: Purchase of ${gold_wt} grams of Gold has been processed for user ${user} Rate: ${gold_rate}`;
};

export const Order_update_on_refund_and_return = ({ order_id, days }) => {
  return `BKSMyGold Update: Refund against the return of order ${order_id} has been processed. Please claim the refund from your refund wallet within ${days} days.`;
};

export const Reorders_reached_the_shop_captain = ({ order_id, username, sku }) => {
  return `BKSMyGold Update: Re-order ${order_id} has reached the shop. Please receive the package. Username: ${username} SKU: ${sku}`;
};

export const Return_order_delivered_merchant = ({ order_id, username, sku }) => {
  return `BKSMyGold Update: Re-order against order number ${order_id} has been delivered. Username: ${username} Order SKU: ${sku}`;
};

export const Return_order_Rejected_and_Reorder_placed_merchant = ({ order_id, username, sku }) => {
  return `BKSMyGold Update: Re-order against order number ${order_id} has been placed. Kindly take the required action. Username: ${username} Order SKU: ${sku}`;
};

export const Return_order_in_transit_merchant = ({ order_id, username, sku }) => {
  return `BKSMyGold Update: Re-order against order number ${order_id} is in transit. Username: ${username} Order SKU: ${sku}`;
};

export const Return_order_delivered = ({ order_id }) => {
  return `BKSMyGold Update: Return order ${order_id} has been delivered to your address today.`;
};

export const Return_order_in_transit = ({ order_id, link }) => {
  return `BKSMyGold Update: Return order ${order_id} has been dispatched and is in transit. It will be delivered to your address soon. Track Order: ${link}`;
};

export const Order_Return_Request_merchant = ({ order_id, username, sku }) => {
  return `BKSMyGold Update: Return request against order number ${order_id} has been raised. Kindly take required action. Username: ${username} Order SKU: ${sku}`;
};

export const Return_order_Rejected_and_Reorder_placed = ({ order_id, link }) => {
  return `BKSMyGold Update: Return request for order ${order_id} has been rejected. Re-order for the same has been initiated. Track Order: ${link}`;
};

export const Order_Return_Refund_update_merchant = ({ order_id, username, sku }) => {
  return `BKSMyGold Update: Return/Refund status against order number ${order_id} has been updated. Username: ${username} Order SKU: ${sku}`;
};

export const Sale_of_Gold_captain = ({ gold_wt, gold_rate, user }) => {
  return `BKSMyGold Update: Sale of ${gold_wt} grams of Gold has been processed for user ${user} Rate: ${gold_rate}`;
};

// this 2nd appointment no im not so sure 
export const Appointment_advance_cancelled_captain = ({ amount, appointment_no, username, time }) => {
  return `BKSMyGold Update: The advance of Rs. ${amount} against appointment ${appointment_no} has been cancelled. Appointment: ${appointment_no} Username: ${username} Timings: ${time}`;
};

export const Verifier_reached_the_Customer_location_captain = ({ appointment_no, user, time }) => {
  return `BKSMyGold Update: The assigned captain against Verifier Appointment ${appointment_no} has reached the location. Details: User: ${user} Timing: ${time}`;
};

export const Verifier_Manager_received_gold_merchant = ({ appointment_no, user, gold_wt }) => {
  return `BKSMyGold Update: The manager has verified the ${gold_wt} grams of Gold from verifier appointment number ${appointment_no} for user ${user}`;
};

export const Order_canceled_captain = ({ order_id, username, sku }) => {
  return `BKSMyGold Update: The order ${order_id} has been canceled. Please receive the package. SKU: ${sku} Username: ${username}`;
};

export const Manager_Assigned_to_captain = ({ order_id, username, sku }) => {
  return `BKSMyGold Update: The order ${order_id} has been packed to dispatch. SKU: ${sku} Username: ${username}`;
};

export const Handover_to_manager_captain = ({ appointment_no, username, gold_wt, gold_rate }) => {
  return `BKSMyGold Update: The package of user ${username} on Verifier Appointment ${appointment_no} has been successfully handed over to the Manager. Gold: ${gold_wt} Rate: ${gold_rate}`;
};

export const Settlements_made_captain = ({ transaction_no, amount, time, username }) => {
  return `BKSMyGold Update: The settlement of Rs. ${amount} against transaction ${transaction_no} has been completed. Username: ${username} Timings: ${time}`;
};

// not sure if it is link or not
export const Verifier_Van_Status_merchant = ({ link }) => {
  return `BKSMyGold Update: The status of your request for the ""Verifier Van"" has been updated. ${link}`;
};

export const Verifier_reached = ({ phone }) => {
  return `BKSMyGold update: The Verifier Van has reached your location. Please submit your physical Gold for further procedures. For more assistance, call ${phone}`;
};

// not sure if it is link or not
export const Support_Tickets_Status_merchant = ({ link }) => {
  return `BKSMyGold Update: There is an update on your raised ticket. ${link}`;
};

export const Transactions_and_Commissions_business = ({ start_date, end_date, credit, commission, amount }) => {
  return `BKSMyGold Update: Transactions from dates ${start_date} to ${end_date} have been credited to your Bank account, MyGold commissions have been deducted Credit: ${credit} Commission: ${commission} Total amount: ${amount}`;
};

export const Disclaimer_After_Melt_verifier_captain = ({ appointment_no, username, gold_wt, gold_rate }) => {
  return `BKSMyGold Update: User ${username} on Verifier Appointment ${appointment_no} has confirmed the disclaimer after melting. Gold: ${gold_wt} Rate: ${gold_rate}`;
};

export const Disclaimer_for_return_Before_Melt_verifier_captain = ({ appointment_no, username, gold_wt, gold_rate }) => {
  return `BKSMyGold Update: User ${username} on Verifier Appointment ${appointment_no} has confirmed the disclaimer before melting. Gold: ${gold_wt} Rate: ${gold_rate}`;
};

export const Disclaimer_Before_Melt_verifier_captain = ({ appointment_no, username, gold_wt, gold_rate }) => {
  return `BKSMyGold Update: User ${username} on Verifier Appointment ${appointment_no} has confirmed the disclaimer before melting. Gold: ${gold_wt} Rate: ${gold_rate}`;
};

export const Disclaimers_for_seal_after_accepting_upload_or_sell_captain = ({ appointment_no, username, gold_wt, gold_rate }) => {
  return `BKSMyGold Update: User ${username} on Verifier Appointment ${appointment_no} has confirmed the disclaimer to seal. Gold: ${gold_wt} Rate: ${gold_rate}`;
};

export const Disclaimers_for_seal_after_rejecting_upload_or_sell_captain = ({ appointment_no, username, gold_wt, gold_rate }) => {
  return `BKSMyGold Update: User ${username} on Verifier Appointment ${appointment_no} has rejected the disclaimer before melting. Gold: ${gold_wt} Rate: ${gold_rate}`;
};

export const Confirmation_of_verifying_refining_merchant = ({ package_id, username }) => {
  return `BKSMyGold Update: Verification and Refining against package number ${package_id} from user ${username} has been completed.`;
};

export const Request_of_appointment_verifier_captain = ({ appointment_no, user, time }) => {
  return `BKSMyGold Update: Verifier Appointment ${appointment_no} has been requested by user ${user} for date, time ${time} . Kindly accept or reschedule.`;
};

export const Reschedule_of_appointment_verifier_captain = ({ appointment_no, user, time }) => {
  return `BKSMyGold Update: Verifier Appointment ${appointment_no} has been rescheduled by the user ${user} for date, time ${time} . Kindly accept or reschedule.`;
};

export const Gold_Collected_from_the_customer_merchant = ({ van_no, captain_name, gold_wt, appointment_no, user }) => {
  return `BKSMyGold Update: Verifier Van number ${van_no} with captain ${captain_name} has collected ${gold_wt} grams of Gold on their appointment number ${appointment_no} with user ${user}`;
};

export const Verifier_Reached_merchant = ({ van_no, captain_name, gold_wt, appointment_no, user }) => {
  return `BKSMyGold Update: Verifier Van number ${van_no} with captain ${captain_name} has reached their destination for appointment number ${appointment_no} for the user ${user}`;
};

// 2 users were there but i only put one
export const Verifier_Started_merchant = ({ van_no, captain_name, appointment_no, user }) => {
  return `BKSMyGold Update: Verifier Van number ${van_no} with captain ${captain_name} has started for appointment number ${appointment_no} for user user ${user}`;
};

export const Verifier_Assigned_merchant = ({ date, appointment_no, user }) => {
  return `BKSMyGold Update: You have been assigned the verifier for appointment number ${appointment_no} on ${date} for user ${user}`;
};

export const Appointment_Initiated_merchant = ({ date, time, appointment_no, user }) => {
  return `BKSMyGold Update: You have been booked for appointment number ${appointment_no} on ${date} by the user ${user} at ${time}`;
};

export const Customer_buyBack_on_fixed_rate = ({ gold_wt, link }) => {
  return `BKSMyGold Update: You have bought back ${gold_wt} grams of Gold on your fixed reserved rate! Purchase Invoice and the Custody Release Certificate: ${link}`;
};

// i dont know what to put here
export const Disclaimers_for_return_items_before_melt = ({ disclaimer, link }) => {
  return `BKSMyGold Update: You have chosen to ""Reject"" ${link} . Please submit your final approval: Disclaimer: ${disclaimer}`;
};

export const Disclaimers_for_return_on_rejection_after_melt = ({ procedure, disclaimer, approval }) => {
  return `BKSMyGold Update: You have chosen to ""Reject"" ${procedure} procedure for your melted Physical Gold. Please submit your final approval: ${approval} Disclaimer: ${disclaimer}`;
};

export const User_used_gold_bank_and_gifted = ({ gold_wt, user }) => {
  return `BKSMyGold Update: You have gifted ${gold_wt} grams of Gold to the user ${user} ! Purchase Invoice and the Custody Release Certificate`;
};

export const User_used_pay_and_gift = ({ gold_wt, amount, user }) => {
  return `BKSMyGold Update: You have gifted ${gold_wt} grams of Gold worth Rs. ${amount} to ${user} user! Payment Receipt:`;
};

export const Placed_bid = ({ gold_wt }) => {
  return `BKSMyGold Update: You have placed your bid for ${gold_wt} grams of Gold! Track your bids:`;
};

export const Gold_payment_complete_merchant = ({ gold_wt, transaction_no, username, gold_rate, }) => {
  return `BKSMyGold Update: You have purchased ${gold_wt} grams of Gold against transaction number ${transaction_no} Username: ${username} Rate: ${gold_rate} Purchase Invoice and the Release of Custody`;
};

export const Got_Payment_merchant = ({ gold_wt, transaction_no, username, gold_rate, }) => {
  return `BKSMyGold Update: You have purchased ${gold_wt} grams of Gold via bid from user ${username} Purchase Invoice and the Custody Release Certificate`;
};

export const Treasury_limit_reached_captain = ({ limit }) => {
  return `BKSMyGold Update: You have reached the Treasury limit of ${limit} , please ship the Gold to MyGold Hub.`;
};

// just ask if this rate here in the templte is gold rate or amount that it is worth for that order.
export const Gold_Received_business = ({ gold_wt, purchase_code, username, gold_rate }) => {
  return `BKSMyGold Update: You have received ${gold_wt} grams of Gold against purchase code ${purchase_code} Details: Username: ${username} Rate: ${gold_rate}"`;
};

export const Counter_offer_bid = ({ gold_wt, offer_amt }) => {
  return `BKSMyGold Update: You have received a counteroffer for your bid for ${gold_wt} grams of Gold! Check offer: ${offer_amt}`;
};

export const User_receives_gift_gold = ({ gold_wt, user }) => {
  return `BKSMyGold Update: You have received a gift of ${gold_wt} grams of Gold from user ${user} ! Sale Invoice and the Certificate of Custody:`;
};

export const Referral_invitation = ({ link, user }) => {
  return `BKSMyGold Update: You have received a referral for MyGold App by User ${user} unlock referral benefits: ${link}`;
};

export const Offer_received_for_bid = ({ link, gold_wt }) => {
  return `BKSMyGold Update: You have received an offer for your bid for ${gold_wt} grams of Gold! Check offer: ${link}`;
};

export const Order_placed_merchant = ({ order_id, username, sku }) => {
  return `BKSMyGold Update: You have received an order ${order_id} Kindly take required action against your order. Username: ${username} Order SKU: ${sku}`;
};

export const User_Transaction_Gold_Redeemed = ({ date, gold_wt }) => {
  return `BKSMyGold Update: You have redeemed ${gold_wt} grams of Gold via Scan & Pay dated ${date} Purchase Invoice and the Custody Release Certificate`;
};

// not sure about the details part here
export const Notify_customer_after_12_months = ({ details, link, gold_wt }) => {
  return `BKSMyGold Update: You have reserved ${gold_wt} grams of Gold Details: ${details} Purchase Invoice, Custody Release Certificate Custody, and Installment Summary: ${link}`;
};

export const Plan_Matured_bonus_earned_merchant = ({ gip_id, username, gold_rate, gold_wt }) => {
  return `BKSMyGold Update: You have sold ${gold_wt} grams of Gold against MyGold GIP ${gip_id} Username: ${username} Rate: ${gold_rate} Purchase Invoice and the Release of Custody`;
};

export const PreInstallment_paid_merchant = ({ gip_id, username, gold_rate, gold_wt }) => {
  return `BKSMyGold Update: You have sold ${gold_wt} grams of Gold against MyGold GIP ${gip_id} Username: ${username} Rate: ${gold_rate} Purchase Invoice and the Release of Custody`;
};

export const Business_if_accepted_to_settle_merchant = ({ transaction_no, username, gold_rate, gold_wt }) => {
  return `BKSMyGold Update: You have sold ${gold_wt} grams of Gold against Transaction Number ${transaction_no} Details: Username: ${username} Rate: ${gold_rate} Purchase Invoice and the Release of Custody`;
};

export const Referral_Plan_Matured_merchant = ({ transaction_no, username, gold_rate, gold_wt }) => {
  return `BKSMyGold Update: You have sold ${gold_wt} grams of Gold against Transaction Number ${transaction_no} Details: Username: ${username} Rate: ${gold_rate} Purchase Invoice and the Release of Custody`;
};

export const Customer_buyBack_on_fixed_rate_merchant = ({ transaction_no, username, gold_rate, gold_wt }) => {
  return `BKSMyGold Update: You have sold ${gold_wt} grams of Gold against Transaction Number ${transaction_no} Username: ${username} Rate: ${gold_rate} Purchase Invoice and the Release of Custody`;
};

export const Business_accepted_merchant_retains_gold = ({ username, gold_rate, gold_wt }) => {
  return `BKSMyGold Update: You have sold ${gold_wt} grams of Gold via Scan & Pay. Username: ${username} Rate: ${gold_rate}`;
};

export const Customer_Notification_when_money_credits = ({ link, gold_wt }) => {
  return `BKSMyGold Update: You have sold ${gold_wt} grams of Gold! Transaction Details and the Purchase Invoice: ${link}`;
};

export const Verifier_van_request_merchant = ({ request_id }) => {
  return `BKSMyGold Update: You have successfully placed your request for a "Verifier Van". Your Request id: ${request_id}`;
};

export const Payment_for_bid_complete = ({ link, gold_wt }) => {
  return `BKSMyGold Update: You have successfully purchased the bid of ${gold_wt} grams of Gold! 🎉 Purchase Invoice and the Custody Release Certificate: ${link}`;
};

export const Notification_after_gold_credited_to_bank = ({ link, gold_wt }) => {
  return `BKSMyGold Update: You have uploaded ${gold_wt} grams of Gold! Gold Bank Summary and the Custody Certificate:`;
};

export const Payment_for_bid_received = ({ link, gold_wt }) => {
  return `BKSMyGold Update: Your bid of ${gold_wt} grams of Gold has been sold! 🎉 Purchase Invoice and Custody Release Certificate: ${link}`;
};

export const Commission_for_verifier_refiner_released_merchant = ({ username, gold_rate, gold_wt }) => {
  return `BKSMyGold Update: Your commission against successful verifying and refining has been released. Username: ${username} Gold: ${gold_wt} Rate: ${gold_rate}`;
};

export const Offer_on_bid_accepted = ({ link, gold_wt }) => {
  return `BKSMyGold Update: Your offer on the bid of ${gold_wt} grams of Gold has been accepted! 🎉 Check Details: ${link}`;
};

export const Order_Return_Request_placed = ({ order_id }) => {
  return `BKSMyGold Update: Your request for order number ${order_id} return has been registered. We will collect the package soon. If this wasn't you, reply with "Raise a ticket".`;
};

export const Reschedule_Verifier_Appointment_Customer_Accepted_captain = ({ appointment_no, username, time }) => {
  return `BKSMyGold Update: Your re-scheduled Verifier Appointment ${appointment_no} has been accepted. Kindly assign the captain for the visit. Details: User: ${username} Timing: ${time}`;
};

export const Verifier_Started = ({ minutes }) => {
  return `BKSMyGold update: Your Verifier Van has started from our location, it will be reaching you within ${minutes} minutes.`;
};

export const Verifier_appointment_confirmed_captain = ({ appointment_no, username, time }) => {
  return `BKSMyGold Update: Your visit against Verifier Appointment ${appointment_no} has been confirmed, Kindly take the necessary actions. Details: User: ${username} Timing: ${time}`;
};

export const Verifier_appointment_cancelled = ({ appointment_no, username, time }) => {
  return `BKSMyGold Verifier Appointment Canceled. Appointment fee refund initiated, it shall reflect in your account in 3-5 business days.`;
};

// not sure about this details
export const Verifier_appointment_initiated = ({ details, link }) => {
  return `BKSMyGold Verifier appointment details: ${details} Payment Receipt: ${link}`;
};

// not sure about this details
export const Verifier_appointment_rescheduled = ({ details }) => {
  return `BKSMyGold Verifier Appointment Reschedule: ${details}`;
};

export const Verifier_appointment_Verifier_Assigned = ({ verifier_details }) => {
  return `BKSMyGold Verifier Appointment: Verifier Assigned: ${verifier_details}`;
};

export const Plan_Matured_bonus_earned = ({ gip_id, link }) => {
  return `Congratulations, your BKSMyGold Investment Plan ${gip_id} has matured! Purchase Invoice, Custody Release Certificate, and Installments and Lease Benefit Summary: ${link}`;
};

export const First_Time_GIP_Initialized = ({ gip_id, link }) => {
  return `Congratulations, your BKSMyGold Investment Plan ${gip_id} has started! Now earn ON GOLD, IN GOLD Sale Invoice and the Custody Certificate: ${link}`;
};

export const Financial_Year_summary_captain = ({ link }) => {
  return `Dear Captain, Please find the annexed BKSMyGold Financial Year Summary.`;
};

export const Monthly_Financial_summary_captain = ({ link }) => {
  return `Dear Captain, Please find the annexed BKSMyGold Monthly Financial Summary.`;
};

export const Notification_if_plan_gets_forfeited = ({ gip_id }) => {
  return `Due to defaulted payments, your BKSMyGold Investment Plan ${gip_id} stands forfeited. Accumulated Gold is available in your Account, the bonus shall not be incurred.`;
};

// not at all sure
export const Proximity_notification_GPI = ({ store, payment, link }) => {
  return `Hey there! You just passed ${store} now you can make ${payment} using BKSMyGold Scan & Pay. Go check out now! Stores near me: ${link}`;
};

export const First_Time_GIP_Initialized_merchant = ({ gold, gold_rate, username, gold_wt, gip_id, link }) => {
  return `MyGold Update: ${gip_id} MyGold GIP has been initiated from your Custody, incurring a monthly sale of ${gold_wt} grams of Gold against a Lease of ${gold} grams of gold. Username: ${username} Rate: ${gold_rate} Purchase Invoice and the Release of Custody and the Lease Statement: ${link}`;
};

export const Sell_Instant_Gold_merchant = ({ gold_rate, username, gold_wt, transaction_no, link }) => {
  return `MyGold Update: You have purchased ${gold_wt} grams of Gold against transaction number ${transaction_no} Username: ${username} Rate: ${gold_rate} Purchase Invoice and the Release of Custody: ${link}`;
};

export const Monthly_lease_interest_earned_merchant = ({ gold_rate, username, gold_wt, lease_no, link }) => {
  return `MyGold Update: You have sold ${gold_wt} grams of Gold against lease number ${lease_no} Username: ${username} Rate: ${gold_rate} Purchase Invoice and the Release of Custody: ${link}`;
};

export const Monthly_installment_paid_merchant = ({ gold_rate, username, gold_wt, gip_id, link }) => {
  return `MyGold Update: You have sold ${gold_wt} grams of Gold against MyGold GIP ${gip_id} Username: ${username} Rate: ${gold_rate} Purchase Invoice and the Release of Custody: ${link}`;
};

export const Skip_payment_paid_same_month_release_of_held_gold_merchant = ({ gold_rate, username, gold_wt, gip_id, link }) => {
  return `MyGold Update: You have sold ${gold_wt} grams of Gold against MyGold GIP ${gip_id} Username: ${username} Rate: ${gold_rate} Purchase Invoice and the Release of Custody: ${link}`;
};

export const All_Installments_paid_merchant = ({ gold_rate, username, gold_wt, gip_id, link }) => {
  return `MyGold Update: You have sold ${gold_wt} grams of Gold against MyGold GIP ${gip_id} Username: ${username} Rate: ${gold_rate} Purchase Invoice and the Release of Custody: ${link}`;
};

export const Buy_Instant_Gold_merchant_app = ({ gold_rate, username, gold_wt, transaction_no, link }) => {
  return `MyGold Update: You have sold ${gold_wt} grams of Gold against transaction number ${transaction_no} Username: ${username} Rate: ${gold_rate} Sale Invoice and Custody: ${link}`;
};

export const Forgot_MPIN_OTP = ({ link }) => {
  return `Request to reset your BKSMyGold MPIN: MPIN reset link: ${link} If the request was not made by you, reply with "Not Me"`;
};

export const New_Bank_Added = ({ bank }) => {
  return `You have added your ${bank} bank account to BKSMyGold app. Now enjoy unlimited smooth transactions. If this wasn't you, reply with "Not Me"`;
};

export const Notify_nominee_after_adding = ({ user, link }) => {
  return `You have been added as a nominee by ${user} in their BKSMyGold account. Details: ${link}`;
};

export const Cancel_GIP_plan = ({ gip_id, link }) => {
  return `You have canceled your BKSMyGold Investment Plan ${gip_id} . Purchase Invoice, Custody Certificate, and Installments and Benefits Summary: ${link}`;
};

export const New_Address_Added = () => {
  return `You have successfully added a new address to BKSMyGold app. If this wasn't you, reply with "Not Me"`;
};

export const New_Signin_with_new_phone = ({ device, time }) => {
  return `Your BKSMyGold account has been logged in with ${device} device at ${time} . If this wasn't you, reply with "not me".`;
};

export const GIP_completed = ({ gip_id, link }) => {
  return `Your BKSMyGold Investment Plan ${gip_id} is successfully completed! Accumulated Gold is now available in your account. The Bonus will be unlocked upon Plan Maturity.`;
};

export const Referral_Not_paying_installment_remind_to_pay = ({ link }) => {
  return `Your Referral BKSMyGold Investment Plan has matured! Accumulated Gold and your referral benefit in your MyGold account: ${link}`;
};

export const Referral_GIP_Plan_Matured = () => {
  return `Your Referral BKSMyGold Investment Plan has matured! Accumulated Gold is now available in your MyGold account. MyGold wallet:`;
};

