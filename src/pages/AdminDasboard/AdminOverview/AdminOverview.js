import "./index.css";
import moment from "moment";
import { toast } from "react-toastify";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, CircularProgress, MenuItem, Select } from "@mui/material";

import OverviewSelect from "./OverviewSelect";
import BarChart from "../../../components/charts/BarChart";
import DashboardLayout from "../../../layouts/dashboard/DashboardLayout";
import { getGraphData } from "../../../services/actions/staffAdmin.actions";
import { getNotifications } from "../../../services/actions/notifications.actions";
import { formatDate } from "../../../utils/helperFunctions";
import { ICONS } from "../../../assets/index";

const AdminOverview = () => {
  const navigate = useNavigate();
  let { currentView } = useParams();
  const [period, setPeriod] = useState({ graph: "daily", activity: moment().format("YYYY-MM-DD") });
  const [loading, setLoading] = useState(true);
  const [graphData, setGraphData] = useState({
    totalAmount: {
      amount: [],
      transactionVolume: [],
    },
    status: {
      failed: [],
      successful: [],
    },
    onboardedMerchants: {
      approved: [],
      refered: [],
      declined: [],
    },
    timestampLabel: [],
  });
  currentView = currentView ? currentView : "amount";
  const [activityData, setActivityData] = useState([]);

  const day = moment().format("YYYY-MM-DD");
  const week = moment(moment().subtract(7, "days")).format("YYYY-MM-DD");
  const month = moment(moment().subtract(30, "days")).format("YYYY-MM-DD");

  const handleChange = (prop) => (event) => {
    setPeriod({ ...period, [prop]: event.target.value });
  };

  const handleGraphData = (data) => {
    const newData = data;
    const result = {
      totalAmount: {
        amount: [],
        transactionVolume: [],
      },
      status: {
        failed: [],
        successful: [],
      },
      onboardedMerchants: {
        approved: [],
        refered: [],
        declined: [],
      },
      timestampLabel: [],
    };

    result.timestampLabel = newData?.transactionAmountData.map((data) => data?.timeStamp);
    result.totalAmount.amount = newData?.transactionAmountData.map(
      (data) => data?.transactionAmount
    );
    result.totalAmount.transactionVolume = newData?.transactionVolumeData.map(
      (data) => data?.transactionVolume
    );
    result.status.successful = newData?.statusOverview.map((data) => data?.successfulTransaction);
    result.status.failed = newData?.statusOverview.map((data) => data?.failedTransaction);
    result.onboardedMerchants.approved = newData?.merchantOverview.map(
      (data) => data?.approvedMerchants
    );
    result.onboardedMerchants.refered = newData?.merchantOverview.map(
      (data) => data?.referredMerchants
    );
    result.onboardedMerchants.declined = newData?.merchantOverview.map(
      (data) => data?.declinedMerchants
    );
    setGraphData(result);
  };

  const fetchGraphData = useCallback(async () => {
    setLoading(true);

    try {
      const result = await getGraphData(period.graph);

      if (result) {
        setLoading(false);
        handleGraphData(result);
      }
    } catch (error) {
      setLoading(false);
      toast.error("error fetching graph data");
    }
  }, [period.graph]);

  useEffect(() => {
    fetchGraphData();
  }, [fetchGraphData]);

  const fetchActivities = useCallback(async () => {
    setLoading(true);

    try {
      const response = await getNotifications(false, 20, period?.activity);
      if (response) {
        setLoading(false);
        setActivityData(response);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "error fetching activities");
    }
  }, [period?.activity]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return (
    <DashboardLayout type="staff">
      <h1 className="pageHeader">Overview</h1>
      <section className="flex flex-col xl:flex-row mt-6 overview gap-6">
        <nav className="xl:pt-4">
          <ul className="flex xl:flex-col justify-between gap-[15px] md:justify-start">
            <li>
              <button
                onClick={(e) => navigate(`/staff/overview/amount`)}
                className={`menu-item ${currentView === "amount" && "active "}`}
              >
                Total Amount
              </button>
            </li>
            <li>
              <button
                onClick={(e) => navigate(`/staff/overview/volume`)}
                className={`menu-item ${currentView === "volume" && "active "}`}
              >
                Transaction Volume
              </button>
            </li>
            <li>
              <button
                onClick={(e) => navigate(`/staff/overview/status`)}
                className={`menu-item ${currentView === "status" && "active"}`}
              >
                Transaction Status
              </button>
            </li>
            <li>
              <button
                onClick={(e) => navigate(`/staff/overview/merchants`)}
                className={`menu-item ${currentView === "merchants" && "active"}`}
              >
                Onboarded Merchants
              </button>
            </li>
          </ul>
        </nav>
        <div className="main-content pt-4 xl:mt-0 w-full">
          <div className="">
            {currentView === "amount" && (
              <div className="">
                <div className="px-4 pt-4 pb-8 graph-box border border-purple-5 rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base text-black font-medium">Total Amount</h3>
                    <OverviewSelect period={period?.graph} handleChange={handleChange("graph")} />
                  </div>
                  <div className="flex justify-center">
                    {loading && <CircularProgress />}
                    {!loading && (
                      <BarChart dataType="amount" period={period?.graph} data={graphData} />
                    )}
                  </div>
                </div>
              </div>
            )}
            {currentView === "volume" && (
              <div className="">
                <div className="px-4 pt-4 pb-8 graph-box border border-purple-5 rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base text-black font-medium">Transaction Volume</h3>
                    <OverviewSelect period={period?.graph} handleChange={handleChange("graph")} />
                  </div>
                  <div className="flex justify-center">
                    {loading && <CircularProgress />}
                    {!loading && (
                      <BarChart dataType="volume" period={period?.graph} data={graphData} />
                    )}
                  </div>
                </div>
              </div>
            )}
            {currentView === "status" && (
              <div className="">
                <div className="px-4 pt-4 pb-8 graph-box border border-purple-5 rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base text-black font-medium">Transaction Status</h3>
                    <OverviewSelect period={period?.graph} handleChange={handleChange("graph")} />
                  </div>
                  <div className="flex justify-center">
                    {loading && <CircularProgress />}
                    {!loading && (
                      <BarChart dataType="transaction" period={period?.graph} data={graphData} />
                    )}
                  </div>
                </div>
              </div>
            )}
            {currentView === "merchants" && (
              <div className="">
                <div className="px-4 pt-4 pb-8 graph-box border border-purple-5 rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base text-black font-medium">Onboarded Merchants</h3>
                    <OverviewSelect period={period?.graph} handleChange={handleChange("graph")} />
                  </div>
                  <div className="flex justify-center">
                    {loading && <CircularProgress />}
                    {!loading && (
                      <BarChart dataType="merchant" period={period?.graph} data={graphData} />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="mt-6 px-4 pt-4 pb-0 border border-purple-5 rounded-lg  ">
            <div className="flex justify-between items-center">
              <h3 className="text-base text-black font-medium">Activity</h3>
              <div>
                <Select
                  value={period.activity}
                  onChange={handleChange("activity")}
                  className="report mb-2"
                  displayEmpty
                  inputProps={{ "aria-label": "period for report" }}
                >
                  <MenuItem value={day}>Daily</MenuItem>
                  <MenuItem value={week}>Weekly</MenuItem>
                  <MenuItem value={month}>Monthly</MenuItem>
                </Select>
              </div>
            </div>
            <hr className="bg-purple-5 border-purple-5" />
            <Box className="flex flex-col justify-center items-center min-h-[300px]">
              {activityData.length > 0 ? (
                <table className="table-auto w-full border-t">
                  <tbody>
                    {activityData > 0 &&
                      activityData?.map((row) => (
                        <tr key={row?.text} className="py-4 text-sm font-normal">
                          <td className="py-4">
                            <div className={`table-dot bg-purple-20 n-${row?.type}`} />
                          </td>
                          <td className="p-4 border-t border-purple-5">{row?.text}</td>
                          <td className="p-4 border-t border-purple-5">
                            {formatDate(row?.dateCreated)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <Box className="flex flex-col justify-center items-center">
                  <img src={ICONS.noData} alt="Not Found" />
                  <p className="text-black">No activities found</p>
                </Box>
              )}
            </Box>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default AdminOverview;
