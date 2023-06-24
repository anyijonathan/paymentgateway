import "./index.css";
import { Box, Stack } from "@mui/material";
import Footer from "../../components/common/footer/Footer";
import Header from "../../components/common/header/Header";
import Inner from "../../layouts/inner landing page/Inner";

const TermsAndConditions = () => {
  return (
    <Box>
      <Header />
      <Box className="generic-banner lg:h-[450px] h-[300px]">
        <h1 className="font-[700] lg:text-[48px] md:text-[40px] text-[30px] text-center text-black opacity-90">
          Terms and Conditions
        </h1>
      </Box>
      <section>
        <Inner>
          <Box
            sx={{ m: {sm:"50px 0px",md:"100px"}, p: {xs:"30px 20px 50px",sm:"50px 50px 100px"} }}
            className="border rounded-[10px] border-gray"
          >
            <h1 className="font-[600] lg:text-[30px] md:text-[24px] text-[18px] text-center text-black mb-[50px]">
              TERMS AND CONDITIONS FOR PAY LATER SERVICE
            </h1>
            <Stack gap="40px" className="details">
              <Stack
                gap="15px"
                component="section"
                className="loan-service-agreement"
              >
                <h3 className="font-[600] lg:text-[18px] md:text-[18px] text-[16px] text-black">
                  LOAN SERVICE AGREEMENT
                </h3>
                <Stack gap="10px">
                  <p className="text-black">
                    Please read these terms and conditions carefully before
                    accepting the Service. By accessing or using the Service
                    (FCMB Pay Later), you agree to be bound by the terms and
                    conditions stated herein. These terms and conditions are
                    subject to changes from time to time and same shall be
                    hosted on FCMB website.
                  </p>
                  <p className="text-black">
                    IF you do not agree with these terms and conditions, please
                    do not Accept or subscribe to the offer or use this service.
                  </p>
                  <p className="text-black">
                    By using this service, you indicate that you unconditionally
                    accept the terms of this agreement and you agree to abide by
                    them.
                  </p>
                  <p className="text-black font-bold my-[10px]">Definitions</p>
                  <p className="text-black">
                    “Borrower” shall mean the subscriber to the offer and or
                    service
                  </p>
                  <p className="text-black">“the Offer” or “the Service”</p>
                  <p className="text-black">
                    “the Bank” shall mean First City Monument Bank Limited
                  </p>
                  <p className="text-black">
                    “CHANNEL” shall mean All platforms through which the Request
                    is made
                  </p>
                </Stack>
              </Stack>
              <Stack gap="15px" component="section" className="whereas">
                <p className="font-[600]  text-black">WHEREAS:</p>
                <Stack gap="10px" className="md:ml-[20px]">
                  <Stack direction="row" gap="5px">
                    <span>1.</span>
                    <p className="text-black">
                      The Borrower has applied for FCMB Pay Later to access
                      goods and services from merchants
                    </p>
                  </Stack>
                  <Stack direction="row" gap="5px">
                    <span>2.</span>
                    <p className="text-black">
                      The Bank has agreed to grant the Pay Later product to the
                      Borrower by way of principal outstanding
                    </p>
                  </Stack>
                  <Stack direction="row" gap="5px">
                    <span>3.</span>
                    <p className="text-black">
                      The Loan amount shall be made available by direct payment
                      into borrower’s current or saving account with FCMB for
                      onward settlement of the merchants for goods and services
                      availed to the borrower.
                    </p>
                  </Stack>
                </Stack>
              </Stack>
              <Stack
                gap="15px"
                component="section"
                className="agreed-as-follows"
              >
                <p className="font-[600]  text-black">
                  IT IS AGREED AS FOLLOWS
                </p>
                <Stack gap="30px" className="md:ml-[20px]">
                  <Stack direction="row" gap="5px">
                    <span>1.</span>
                    <p className="text-black">
                      <span className="font-bold">The Loan</span>
                      <br />
                      <p className="mt-[10px]">
                        The Bank hereby agrees to make available to the Borrower
                        and the Borrower accepts the sum to be disbursed
                        (hereinafter referred to as “the Pay Later”), by the
                        Bank after borrower’s risk assessment and scoring, for a
                        period not exceeding 90 days from the date of
                        disbursement subject to the Eligible tenor of the
                        customer and the loan tenor chosen by the customer from
                        the available offers.{" "}
                      </p>
                    </p>
                  </Stack>
                  <Stack direction="row" gap="5px">
                    <span>2.</span>
                    <p className="text-black">
                      <span className="font-bold">Interest Rate</span>
                      <br />
                      <p className="mt-[10px]">
                        <b>Customers with FCMB account:</b> There will be a risk
                        - based interest rate of 15% per disbursal which
                        translates to annual percentage rate of 180% for
                        non-salary customers and 8% (96% p.a) for salaried
                        customers. The interest amount & principal amount would
                        be collected on the repayment date of the loan.
                        Pre-liquidation of the loan before the due date or for
                        any other reason; customers would pay the full interest
                        amount. If the Borrower fails to pay any amount which
                        the Borrower owes the Bank in terms of this agreement on
                        the due date, the Bank shall be entitled to continue to
                        charge interest on the outstanding amount at interest
                        rate/30 per day.
                      </p>
                    </p>
                  </Stack>
                  <Stack direction="row" gap="5px">
                    <span>3.</span>
                    <p className="text-black">
                      <span className="font-bold">Payment</span>
                      <br />
                      <p className="mt-[10px]">
                        The Borrower agrees that the Bank shall have the right
                        to deduct the due repayment in full either directly from
                        any of the borrower’s accounts or from the salary
                        payment source including salary account, saving account,
                        deposit account, corporate account with the Bank and any
                        bank in Nigeria or outside of Nigeria including all
                        accounts linked to the Borrowers Bank Verification
                        Number (BVN).
                      </p>
                      <br />
                      <p>
                        The Borrower hereby gives the Bank the right to deduct
                        monies owing to it from any credit inflow and salary
                        inflow into the accounts in the Bank, any other Bank or
                        payment platform in Nigeria and outside Nigeria
                      </p>
                    </p>
                  </Stack>
                  <Stack direction="row" gap="5px">
                    <span>4.</span>
                    <p className="text-black">
                      <span className="font-bold">Costs and Charges</span>
                      <br />
                      <p className="mt-[10px]">
                        All out-of-pocket expenses including registration, legal
                        fees, stamp duties and other fees incurred by the Bank
                        in processing of this facility including enforcement of
                        security and recovery of facility in the event of
                        default shall be for the account of the Borrower.
                      </p>
                    </p>
                  </Stack>
                  <Stack direction="row" gap="5px">
                    <span>5.</span>
                    <p className="text-black">
                      <span className="font-bold">Breach</span>
                      <br />
                      <p className="my-[10px]">In the event of:</p>
                      <ul className="flex flex-col gap-[10px] ml-[10px]">
                        <li>
                          {" "}
                          any failure by the Borrower to pay any amount which is
                          due and outstanding under this agreement{" "}
                        </li>
                        <li>
                          any breach by the Borrower of the terms of this
                          agreement or{" "}
                        </li>
                        <li>
                          any failure by the Borrower to carry out his or her
                          obligations under this agreement; then the full sum
                          outstanding under this agreement, together with any
                          penal charge (if any) and all other charges and
                          expenses owing to and due to the Bank by the Borrower
                          shall become immediately due and payable, and without
                          giving notice to the Borrower, the Bank shall be
                          entitled to terminate this agreement and claim and/or
                          recover from the Borrower any damages/losses it may
                          have suffered as a consequence.
                        </li>
                      </ul>
                    </p>
                  </Stack>
                  <Stack direction="row" gap="5px">
                    <span>6.</span>
                    <p className="text-black">
                      <span className="font-bold">Authorization to comply</span>
                      <br />
                      <p className="mt-[10px]">
                        The Borrower agrees that the Bank is irrevocably
                        authorized to comply with any instructions on the
                        Service receives on his/her behalf through the Bank
                        Channels and it is agreed that such Instruction shall be
                        irrevocably deemed to be the Borrower’s Instruction.
                      </p>
                    </p>
                  </Stack>
                  <Stack direction="row" gap="5px">
                    <span>7.</span>
                    <p className="text-black">
                      <ul className="flex flex-col gap-[10px] ml-[10px]">
                        <li>
                          <h3 className="font-bold">
                            Set off and consolidation rights{" "}
                          </h3>
                          <p className="mt-[10px]">
                            The Bank may at any time and without notice to the
                            Borrower combine all or any of the Borrower’s
                            accounts and liabilities with the Bank in Nigeria
                            (or elsewhere) whether singly or jointly with any
                            person, or set off all or any monies standing to the
                            credit of such account(s) including the Borrower’s
                            deposits with the Bank (whether matured or not)
                            towards satisfaction of any of the Borrower’s
                            liabilities to the Bank whether as principal or
                            surety, actual or contingent, primary or collateral,
                            singly or jointly with any other person and the Bank
                            may effect any necessary currency conversion at the
                            Bank’s own rate of exchange then prevailing.
                            Exchange risks associated with any collateral, cash
                            or otherwise in satisfaction of outstanding debt
                            shall be borne by the Borrower.{" "}
                          </p>
                          <p className="mt-[10px]">
                            By accepting the terms &amp; conditions of the loan
                            and by drawing on the loan. I covenant to repay the
                            loan as and when due. In the event that I fail to
                            repay the loan as agreed, and the loan becomes
                            delinquent, the bank shall have the right to report
                            the delinquent loan to the CBN through the Credit
                            Risk Management System (CRMS) or by any other means,
                            and request the CBN to exercise its regulatory power
                            to direct all banks and other financial institutions
                            under its regulatory purview to set-off my
                            indebtedness from any money standing to my credit in
                            any bank account and from any other financial assets
                            they may be holding for my benefit.{" "}
                          </p>
                          <p className="mt-[10px]">
                            I covenant and warrant that the CBN shall have power
                            to set-off my indebtedness under this loan agreement
                            from all such monies and funds standing to my
                            credit/benefit in any and all such accounts or from
                            any other financial assets belonging to me and in
                            the custody of any such bank.{" "}
                          </p>
                          <p className="mt-[10px]">
                            I hereby waive any right of confidentiality whether
                            arising under common law or statute or in any other
                            manner whatsoever and irrevocably agree that I shall
                            not argue to the contrary before any court of law,
                            tribunal, administrative authority or any other body
                            acting in any judicial or quasi-judicial capacity.{" "}
                          </p>
                        </li>
                        <li className="mt-[20px]">
                          <h3 className="font-bold">
                            Universal consolidation rights
                          </h3>
                          <p className="mt-[10px]">
                            The Bank may, pursuant to this Agreement, charge,
                            attach and debit the balances standing to the credit
                            of the Borrower in any account linked to, or
                            associated with, the Borrower by way of a Bank
                            Verification Number (BVN) in any commercial bank,
                            microfinance bank, mortgage bank, finance house,
                            payment service bank, mobile payment service
                            operators or any other financial service
                            operatorship for which the Central Bank of Nigeria
                            may issue any licences in the future whether such
                            accounts be opened or in existence before, during or
                            after the execution of this Agreement.{" "}
                          </p>
                          <ul
                            style={{ listStyleType: "square" }}
                            className="md:ml-[20px] mt-[10px]"
                          >
                            <li>
                              The Bank may exercise its prerogative pursuant to
                              clause 8.2 hereof without notice, warning, advice,
                              caution, announcement, or other recourse
                              whatsoever to the Borrower
                            </li>
                          </ul>
                        </li>
                        <li className="mt-[20px]">
                          <h3 className="font-bold">Direct Debits</h3>By using
                          the service, you agree to grant FCMB irrevocable
                          authorization to issue open-ended direct debit
                          mandates on all accounts you operate in FCMB or any
                          other Bank in Nigeria or abroad and through any
                          payment platforms through which your salary is paid
                          and in the event of default on loan, you agree that
                          FCMB has your authorization to place a banker’s lien
                          or debit all accounts you own in FCMB or any other
                          Bank in Nigeria or abroad, until all outstanding
                          balance you owe have been recovered.
                        </li>
                      </ul>
                    </p>
                  </Stack>
                  <Stack direction="row" gap="5px">
                    <span>8.</span>
                    <p className="text-black">
                      <span className="font-bold">Appropriation</span>
                      <br />
                      <ul className="ml-[10px] ">
                        <li className="mt-[10px]">
                          All amounts received by the Bank will be first
                          apportioned towards overdue interest charged /fees.
                          Any balance outstanding thereafter shall be
                          appropriated lastly towards the principal sum.{" "}
                        </li>
                        <li className="mt-[10px]">
                          The Bank reserves the right to refuse acceptance of
                          post-dated cheques or such other instruments towards
                          payment or settlement of the credit facility.{" "}
                        </li>
                      </ul>
                    </p>
                  </Stack>
                  <Stack direction="row" gap="5px">
                    <span>9.</span>
                    <p className="text-black">
                      <span className="font-bold">Indemnity</span>
                      <br />
                      <p className="mt-[10px]">
                        The Borrower agrees to fully indemnify the Bank against
                        all costs and expenses (including legal fees, collection
                        commission et cetera) arising in any way in connection
                        with the Borrower’s accounts, these terms and
                        conditions, in enforcing these terms and conditions or
                        in recovering any amounts due to the Bank or incurred by
                        the Bank in any legal proceedings of whatever nature.
                      </p>
                    </p>
                  </Stack>
                  <Stack direction="row" gap="5px">
                    <span>10.</span>
                    <p className="text-black">
                      <span className="font-bold">Waiver</span>
                      <br />
                      <ul className="ml-[10px]">
                        <li className="mt-[10px]">
                          No forbearance, neglect or waiver by the Bank in the
                          enforcement of any of these terms and conditions shall
                          prejudice the Bank’s right to strictly enforce the
                          same. No waiver by the Bank shall be effective unless
                          it is in writing.
                        </li>
                        <li className="mt-[10px]">
                          In so far as any right is conferred on the Borrower
                          with regard to any obligation imposed on the Borrower
                          by this contract, the Borrower hereby waives and
                          forgoes all such rights and benefits, whether
                          conferred by a statute.
                        </li>
                      </ul>
                    </p>
                  </Stack>
                  <Stack direction="row" gap="5px">
                    <span>11.</span>
                    <p className="text-black">
                      Operations and Regulation of Credit Bureau and Credit
                      Bureau Related Transactions in Nigeria is by Central Bank
                      of Nigeria, the Bank hereby gives Notice to the Borrower
                      of its duty to share information on the Borrower’s credit
                      status and business history as may be required from time
                      to time by Regulators
                    </p>
                  </Stack>
                  <Stack direction="row" gap="5px">
                    <span>12.</span>
                    <p className="text-black">
                      <span className="font-bold">
                        Assignment to Third Parties
                      </span>
                      <br />
                      <p className="mt-[10px]">
                        The Bank reserves the right to assign this agreement to
                        a third party without the permission of the Borrower
                      </p>
                    </p>
                  </Stack>
                  <Stack direction="row" gap="5px">
                    <span>13.</span>
                    <p className="text-black">
                      <span className="font-bold">Service Availability</span>
                      <br />
                      <p className="mt-[10px]"></p>
                    </p>
                  </Stack>
                  <Stack direction="row" gap="5px">
                    <span>14.</span>
                    <p className="text-black">
                      <ul className="ml-[10px]">
                        <li>
                          {" "}
                          Use of the Service may from time to time be
                          unavailable, delayed, limited or slow due to, but not
                          restricted to the following factors:
                        </li>
                        <ul
                          style={{ listStyleType: "square" }}
                          className="md:ml-[40px] mt-[10px]"
                        >
                          <li className="mt-[10px]">Force majeure</li>
                          <li className="mt-[10px]">
                            Industrial Strike Actions{" "}
                          </li>
                          <li className="mt-[10px]">
                            Failure from hardware and software
                          </li>
                          <li className="mt-[10px]">
                            system capacities overload
                          </li>
                          <li className="mt-[10px]">
                            failure of or suspension of public or private
                            telecommunication networks{" "}
                          </li>
                          <li className="mt-[10px]">
                            power supply or other utilities interruption{" "}
                          </li>
                          <li className="mt-[10px]">
                            government or regulatory restrictions, court or
                            tribunal rulings, amendment of legislation or other
                            human intervention{" "}
                          </li>
                          <li className="mt-[10px]">
                            any other cause whatsoever beyond the Bank’s control
                          </li>
                        </ul>
                        <li className="mt-[20px]">
                          The Borrower acknowledges and agrees that internet and
                          telecommunications transmissions are never completely
                          private or secured.
                        </li>
                        <li className="mt-[10px]">
                          All content and services on or available through the
                          Services are provided on an "as is" basis and the Bank
                          does not make any representation or give any warranty
                          or guarantee in respect of the Service or its content.
                        </li>
                        <li className="mt-[10px]">
                          The Bank may discontinue or make changes in the
                          Service at any time without prior notice to the
                          Borrower and without any liability whatsoever.
                        </li>
                      </ul>
                    </p>
                  </Stack>
                  <Stack direction="row" gap="5px">
                    <span>15.</span>
                    <p className="text-black">
                      <span className="font-bold">
                        General Provisions and Conditions
                      </span>
                      <br />
                      <ul>
                        <li className="mt-[10px]">
                          Drawdown under the facility is subject to availability
                          of funds.{" "}
                        </li>
                        <li className="mt-[10px]">
                          SMS alerts / notification charges incurred in relation
                          to this loan shall be for the account of the borrower.
                        </li>
                        <li className="mt-[10px]">
                          {" "}
                          The Borrower irrevocably undertakes that for the
                          period of this agreement, he or she will maintain his
                          or her bank account designated for the purposes of the
                          loan with the Bank.{" "}
                        </li>
                        <li className="mt-[10px]">
                          In the event that the facility becomes due and unpaid,
                          the Bank reserves the right to notify Embassies, High
                          Commissions, foreign consulates, referees, other
                          relevant individuals as contained in the Borrower’s
                          Bank records and any other Entity the Bank considers
                          necessary on the Borrower’s indebtedness to the Bank.
                        </li>
                        <li className="mt-[10px]">
                          The Borrower authorizes the Bank to access any
                          information available to process his or her
                          application, and permission to register details of the
                          trend of the Borrower’s account with any credit
                          bureau, and the Borrower waives any claims he or she
                          may have against the Bank in respect of such
                          disclosure.
                        </li>
                        <li className="mt-[10px]">
                          The Bank reserves the right to unilaterally review the
                          facility including pricing, prepayment and past due
                          obligation charge from time to time in the light of
                          changing market conditions and also to terminate this
                          facility based on any adverse information threatening
                          the basis of this relationship or putting the facility
                          at the risk of loss and where the borrower is in
                          breach of any of the terms and conditions of this
                          facility. The Borrower shall be notified of any
                          decision taken in this respect.{" "}
                        </li>
                        <li className="mt-[10px]">
                          The Borrower hereby agrees and consents that such
                          notification by the Bank shall be by way of text
                          messages sent to the Borrowers mobile phone numbers
                          listed on the Borrowers account package with the Bank
                          or by e-mail messages sent to Borrower’s e-mail
                          address listed on the Borrower’s account
                          details/application with the Bank or through any other
                          means the Bank may consider appropriate
                        </li>
                        <li className="mt-[10px]">
                          The Borrower specifically and unequivocally waives any
                          right to contest, challenge, protest or claim upon any
                          subsequent amendments made by the Bank to the terms of
                          this facility or any notification sent by way of
                          e-mail or text message to the Borrower’s e-mail
                          address or mobile phone numbers.{" "}
                        </li>
                        <li className="mt-[10px]">
                          The terms and conditions of this banking facility are
                          subject to the Banking and other applicable laws of
                          the Federal Republic of Nigeria as prescribed from
                          time to time and the jurisdiction of the Nigerian
                          Courts.
                        </li>
                        <li className="mt-[10px]">
                          The Bank does not make any representation or warranty
                          as to the accuracy or completeness of any due
                          diligence reports or other reports, documents, or
                          credit analyses prepared, or caused to be prepared, by
                          it in connection with its activities under this
                          facility or otherwise.
                        </li>
                        <li className="mt-[10px]">
                          The goods and services is solely between the borrower
                          and the merchant without any liability on the part of
                          the bank, the role of the bank is to fund the purchase
                          of the eligible borrower after the borrower accepts
                          the loan offer
                        </li>
                        <li className="mt-[10px]">
                          The Borrower confirms that he/she has read, understood
                          and agreed to the above terms and conditions. By using
                          this service the Borrower indicates that he/she
                          unconditionally accepts the terms of this agreement
                          and agrees to abide by these terms. The Borrower also
                          agrees that this agreement is in effect until he/she
                          discontinues the use of the service and all financial
                          obligations with regard to his/her use of the service
                          has been fully fulfilled.
                        </li>
                      </ul>
                    </p>
                  </Stack>
                </Stack>
              </Stack>
              <li className="text-black">
                <h3 className="font-bold">Notices</h3>
                <ul style={{ listStyleType: "unset" }}>
                  <li className="mt-[10px]">
                    The Borrower agrees to accept service of all notices,
                    processes and any other communication relating to this loan
                    through email address and/ or SMS to phone number registered
                    with the Bank and hereby confirms these phone numbers and
                    addresses as his/ her phone number and address for service.
                    Therefore, the Borrower also agrees that it is his/her
                    responsibility to ensure that his/her contact details
                    including phone number maintained with the bank are valid.
                  </li>
                  <li className="mt-[10px]">
                    All notices and processes sent by registered post will be
                    deemed to have been received Seven (7) days after the date
                    of posting; all notices and processes delivered by hand
                    shall be deemed to have been received on the day such letter
                    is dated.
                  </li>
                </ul>
              </li>
            </Stack>
          </Box>
        </Inner>
      </section>
      <Footer />
    </Box>
  );
};

export default TermsAndConditions;
