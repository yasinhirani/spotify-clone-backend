"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubscription = void 0;
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const razorpay_1 = __importDefault(require("../../utils/razorpay"));
const createSubscription = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        plan_id: "plan_OP0mr3mklJMhZt",
        total_count: 6,
        quantity: 1,
        customer_notify: true,
        start_at: Math.floor(Date.now() / 1000),
    };
    const response = yield razorpay_1.default.subscriptions.create(params);
    res.status(201).json({
        success: true,
        message: "Subscription created successfully",
        data: {
            subscriptionId: response.id,
        },
    });
}));
exports.createSubscription = createSubscription;
