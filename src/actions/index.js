//Some action occured like event handling
export const collapseSideBar = () => {
    console.log("You collapse side bar: ");
    return {
        type: "COLLAPSE_SIDEBAR"
    }
};

export const expandSideBar = () => {
    console.log("You expand side bar: ");
    return {
        type: "EXPAND_SIDEBAR"
    }
};

const FETCH_CANCEL_LEAVE_REQUESTS_PENDING = 'FETCH_CANCEL_LEAVE_REQUESTS_PENDING';
const FETCH_CANCEL_LEAVE_REQUESTS_SUCCESS = 'FETCH_CANCEL_LEAVE_REQUESTS_SUCCESS';
const FETCH_CANCEL_LEAVE_REQUESTS_ERROR = 'FETCH_CANCEL_LEAVE_REQUESTS_ERROR';

export const fetchProductsPending = () => {
    return {
        type: FETCH_CANCEL_LEAVE_REQUESTS_PENDING
    }
};

export const fetchProductsSuccess = (cancelLeaveRequests) => {
    return {
        type: FETCH_CANCEL_LEAVE_REQUESTS_SUCCESS,
        cancelLeaveRequests: cancelLeaveRequests
    }
};

export const fetchProductsError = (error) => {
    return {
        type: FETCH_CANCEL_LEAVE_REQUESTS_ERROR,
        error: error
    }
};


