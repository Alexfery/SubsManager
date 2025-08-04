import mongoose from 'mongoose';
const Subscription = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    price:
        {
            type: Number,
            required: [true, 'Price is required'],
            min: 0,
            max: 1000
        },
    currency:
        {
            type: String,
            enum: ['RON', 'EUR', 'USD'],
            default: 'RON'
        },

    frequency:
        {
            type: String,
            enum: ['daily', 'monthly', 'yearly'],
            default: 'monthly'
        },
    category:
        {
            type: String,
            enum: ['food', 'clothes', 'health', 'education', 'transportation', 'entertainment', 'other'],
            required: [true, 'Category is required']
        },
    paymentMethod:
        {
            type: String,
            trim: true,
            required: [true, 'Payment method is required']
        },
    status:
        {
            type: String,
            enum: ['active', 'inactive', 'expired'],
            default: 'active'
        },
    startDate:
        {
            type:Date,
            required: [true, 'Start date is required'],
            validate: {
                validator:(value)=> value <=Date(),
                message: 'Start date must be in the past'
            }

        },
    renewalDate:{
        type:Date,
        required: [true, 'Renewal date is required'],
        validate: {
            validator:function (value){ return value > this.startDate;},
            message: 'Renewal date must be after the start date'
        }
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }

},{timestamps: true});
// Calculate renewal date if missing
// eslint-disable-next-line no-undef
subscriptionSchema.pre('save', function(next){
    if(!this.renewalDate)
    {
        const renewalPeriods={
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };
        this.renewalDate= new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getdate()+renewalPeriods[this.frequency]);

    }

    //auto-update the status if the renewal date has passed
    if(this.renewalDate< new Date()){
        this.status='expired';
    }
    next();
})

const SubscriptionModel = mongoose.model('Subscription', Subscription);
export default SubscriptionModel;