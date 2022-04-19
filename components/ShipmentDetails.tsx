import Link from "next/link";
import React, { Dispatch, SetStateAction, useState } from "react";
import route from "../config/route";

type ShipmentDetailsProps = {
    values: {
        fullname: string;
        email: string;
        address: string;
        phone: string;
        note: string;
    };
    setValues: Dispatch<
        SetStateAction<{
            fullname: string;
            email: string;
            address: string;
            phone: string;
            note: string;
        }>
    >;
    setCheckout: Dispatch<SetStateAction<number>>;
};
const ShipmentDetailsComponent = (props: ShipmentDetailsProps) => {
    const { values, setValues, setCheckout } = props;
    const [vali, setVali] = useState({
        fullname: false,
        address: false,
        phone: false,
    });
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setVali({
            fullname: !values.fullname,
            phone: !values.phone,
            address: !values.address,
        });
        if (values.fullname && values.phone && values.address) {
            setCheckout(1);
        }
    };
    return (
        <form onSubmit={onSubmit}>
            <div className="mb-5">
                <div className="_input">
                    <label htmlFor="fullname">Họ và tên *</label>
                    <input
                        value={values.fullname}
                        onChange={(e) =>
                            setValues({ ...values, fullname: e.target.value })
                        }
                        id="fullname"
                        placeholder="_"
                    ></input>
                </div>
                {vali.fullname && (
                    <p className="text-red-600">Tên không được trống</p>
                )}
            </div>

            <div className="flex mb-5">
                <div className="_email">
                    <div className="_input">
                        <label htmlFor="email">Email</label>
                        <input
                            value={values.email}
                            onChange={(e) =>
                                setValues({ ...values, email: e.target.value })
                            }
                            id="email"
                            placeholder="_"
                        ></input>
                    </div>
                </div>

                <div className="_phone">
                    <div className="_input">
                        <label htmlFor="phone">Số điện thoại *</label>
                        <input
                            value={values.phone}
                            onChange={(e) =>
                                setValues({ ...values, phone: e.target.value })
                            }
                            id="phone"
                            placeholder="_"
                        ></input>
                    </div>
                    {vali.phone && (
                        <p className="text-red-600">
                            Số điện thoại không được trống
                        </p>
                    )}
                </div>
            </div>
            <div className="mb-5">
                <div className="_input">
                    <label htmlFor="address">Địa chỉ *</label>
                    <input
                        value={values.address}
                        onChange={(e) =>
                            setValues({ ...values, address: e.target.value })
                        }
                        id="address"
                        placeholder="_"
                    ></input>
                </div>
                {vali.address && (
                    <p className="text-red-600">Địa chỉ không được trống</p>
                )}
            </div>
            <div className="mb-10">
                <div className="_input">
                    <label htmlFor="node">Ghi chú</label>
                    <input
                        value={values.note}
                        onChange={(e) =>
                            setValues({ ...values, note: e.target.value })
                        }
                        id="node"
                        placeholder="_"
                    ></input>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <Link href={route.CART}>
                    <a>Giỏ hàng</a>
                </Link>
                <button
                    className="px-10 py-4 rounded text-white bg-sky-600"
                    type="submit"
                >
                    Phương thức thanh toán
                </button>
            </div>
        </form>
    );
};
export default ShipmentDetailsComponent;
