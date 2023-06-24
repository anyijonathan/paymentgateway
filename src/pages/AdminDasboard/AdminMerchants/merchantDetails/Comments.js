import { Box, Stack } from "@mui/material";
import TransactionDetailsLayout from "../../../../layouts/dashboard/transactionDetails/TransactionDetailsLayout";

const Comments = ({ comment }) => {

  const sortedComments = comment.sort(function(a, b) { return new Date(b.dateSent) - new Date(a.dateSent) })

  return (
    <div className="transaction-details merchant-details lg:w-[98%]">
      <Box className="payment-details ">
        <TransactionDetailsLayout title="Comments">
          {sortedComments?.map((comment, indx) => (
            <Stack
              direction="column"
              gap="5px"
              key={indx}
              className={`comment-details ${
                comment?.role?.toLowerCase()?.includes("maker") ? "text-right" : "text-left"
              }`}
            >
              <Stack>
                <Stack
                  direction={
                    comment?.role?.toLowerCase()?.includes("maker") ? "row-reverse" : "row"
                  }
                  gap="10px"
                  className="items-baseline"
                >
                  {" "}
                  <h3 className="value text-base font-medium">{comment?.staffName}</h3>
                  <p className="value text-grey text-xs">{calcDate(comment?.dateSent)}</p>
                </Stack>
                <p className="value text-purple text-xs">{comment?.role}</p>
              </Stack>
              <p className="label text-sm font-light">{comment?.message}</p>
            </Stack>
          ))}
        </TransactionDetailsLayout>
      </Box>
    </div>
  );
};

export default Comments;

function calcDate(date) {
  const dateSent = new Date(date);
  const time = dateSent.toLocaleTimeString();
  let month = dateSent.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  let day = dateSent.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  const year = dateSent.getFullYear();

  const newDate = day + "-" + month + "-" + year + " | " + time;
  return newDate;
}
