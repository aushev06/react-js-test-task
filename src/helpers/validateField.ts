export const validateField = (key: string, touched: Record<string, unknown>, errors: Record<string, unknown>) => {
    if (touched[key]) {
        if (errors[key]) {
            return "error";
        } else {
            return "success";
        }
    } else {
        return "";
    }
};
