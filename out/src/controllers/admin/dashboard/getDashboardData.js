"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../../types/response"));
const getDashboardData = async (req, res) => {
    try {
        const [users, verifiedServiceProviders, unVerifiedServiceProviders, verifiedJobs, unVerifiedJobs, verifiedTenders, unVerifiedTenders, grants, news, verifiedBlogs, unVerifiedBlogs,] = await Promise.all([
            prismaClient_1.default.user.count(),
            prismaClient_1.default.service_provider.count({
                where: {
                    verified_by: {
                        not: null,
                    },
                },
            }),
            prismaClient_1.default.service_provider.count({
                where: {
                    verified_by: null,
                },
            }),
            prismaClient_1.default.job_post.count({
                where: { verified_by: { not: null } },
            }),
            prismaClient_1.default.job_post.count({
                where: { verified_by: null },
            }),
            prismaClient_1.default.tender.count({ where: { verified_by: { not: null } } }),
            prismaClient_1.default.tender.count({ where: { verified_by: null } }),
            prismaClient_1.default.grant.count(),
            prismaClient_1.default.news.count(),
            prismaClient_1.default.blog.count({ where: { verified_by: { not: null } } }),
            prismaClient_1.default.blog.count({ where: { verified_by: null } }),
        ]);
        const datas = {
            users,
            verified_service_providers: verifiedServiceProviders,
            unverified_service_providers: unVerifiedServiceProviders,
            verified_jobs: verifiedJobs,
            unverified_jobs: unVerifiedJobs,
            verified_tenders: verifiedTenders,
            unverified_tenders: unVerifiedTenders,
            verified_blogs: verifiedBlogs,
            unverified_blogs: unVerifiedBlogs,
            grants,
            news,
        };
        return res.status(200).json(new response_1.default(true, "Dashboard data", datas));
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(new response_1.default(false, "Failed to fetch dashboard data!", null, error));
    }
};
exports.default = getDashboardData;
