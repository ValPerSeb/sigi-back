import { getDashboardData } from "../model/dashboardModel.js";

export const dashboardInfo = async (req, res) => {
    try {
        const data = await getDashboardData();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};