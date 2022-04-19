import notify from "../container/notify";

export function errorAPI(error: any) {
    console.log("err___________", error);
    if (typeof error.response === "undefined") {
        notify.error("Đã có lỗi sảy ra, bạn vui lòng thử lại sau");
        return;
    }
    notify.error(error.response.data.message);
}
