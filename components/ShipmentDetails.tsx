import Link from "next/link";
import React, { Dispatch, Fragment, SetStateAction, useState } from "react";
import { useSelector } from "react-redux";
import route from "../config/route";
import notify from "../container/notify";
import { ValueAddress } from "../hooks/useAddress";
import { AppState } from "../store";
import { Select } from "antd";
import { District, Provincial, Ward } from "../api/repository/countriesAPI";

const { Option } = Select;
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
    addressValue: ValueAddress;
    districts: District[];
    provincials: Provincial[];
    setAddressValue: React.Dispatch<React.SetStateAction<ValueAddress>>;
    wards: Ward[];
};

const ShipmentDetailsComponent = (props: ShipmentDetailsProps) => {
    const {
        values,
        setValues,
        setCheckout,
        addressValue,
        districts,
        provincials,
        setAddressValue,
        wards,
    } = props;

    const [vali, setVali] = useState({
        fullname: false,
        address: false,
        phone: false,
    });

    const carts = useSelector((s: AppState) => s.cart.carts);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setVali({
            fullname: !values.fullname,
            phone: !values.phone,
            address:
                !values.address ||
                !addressValue.provincial ||
                !addressValue.district ||
                !addressValue.ward,
        });
        if (
            values.fullname &&
            values.phone &&
            values.address &&
            addressValue.provincial &&
            addressValue.district &&
            addressValue.ward
        ) {
            if (carts.length) {
                setCheckout(1);
            } else {
                notify.error("Gi??? h??ng tr???ng, kh??ng th??? thanh to??n");
            }
        }
    };
    return (
        <form onSubmit={onSubmit}>
            <div className="mb-5">
                <div className="_input">
                    <label htmlFor="fullname">H??? v?? t??n *</label>
                    <input
                        type="text"
                        value={values.fullname}
                        onChange={(e) =>
                            setValues({ ...values, fullname: e.target.value })
                        }
                        id="fullname"
                        placeholder="_"
                    ></input>
                </div>
                {vali.fullname && (
                    <p className="text-red-600">T??n kh??ng ???????c tr???ng</p>
                )}
            </div>

            <div className="flex mb-5">
                <div className="_email">
                    <div className="_input">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
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
                        <label htmlFor="phone">??i???n tho???i *</label>
                        <input
                            type="number"
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
                            S??? ??i???n tho???i kh??ng ???????c tr???ng
                        </p>
                    )}
                </div>
            </div>
            <div className="mb-5">
                <div className="_input">
                    <label htmlFor="address">?????a ch??? *</label>
                    <input
                        type="text"
                        value={values.address}
                        onChange={(e) =>
                            setValues({ ...values, address: e.target.value })
                        }
                        id="address"
                        placeholder="_"
                    ></input>
                </div>
            </div>
            <div className="flex flex-wrap mb-5">
                <div className="w-1/3 pr-2">
                    <div className="_input">
                        <label htmlFor="provincial">T???nh*</label>
                        <Select
                            id="provincial"
                            className="w-full"
                            placeholder="T???nh"
                            value={addressValue.provincial?.code ?? ""}
                            onChange={(val) => {
                                setAddressValue({
                                    ...addressValue,
                                    provincial: provincials.filter(
                                        (p) => p.code === val
                                    )[0],
                                });
                            }}
                        >
                            {provincials.map((prov) => (
                                <Option key={prov.code} value={prov.code}>
                                    {prov.name}
                                </Option>
                            ))}
                        </Select>
                    </div>
                </div>
                <div className="w-1/3 px-1">
                    <div className="_input">
                        <label htmlFor="district">Huy???n*</label>
                        <Select
                            id="district"
                            className="w-full"
                            placeholder="Huy???n"
                            value={addressValue.district?.code ?? ""}
                            onChange={(val) => {
                                setAddressValue({
                                    ...addressValue,
                                    district: districts.filter(
                                        (p) => p.code === val
                                    )[0],
                                });
                            }}
                        >
                            {districts.map((dis) => (
                                <Option key={dis.code} value={dis.code}>
                                    {dis.name}
                                </Option>
                            ))}
                        </Select>
                    </div>
                </div>
                <div className="w-1/3 pl-2">
                    <div className="_input">
                        <label htmlFor="ward">X??*</label>
                        <Select
                            id="ward"
                            className="w-full"
                            placeholder="X??"
                            value={addressValue.ward?.code ?? ""}
                            onChange={(val) => {
                                setAddressValue({
                                    ...addressValue,
                                    ward: wards.filter(
                                        (p) => p.code === val
                                    )[0],
                                });
                            }}
                        >
                            {wards.map((w) => (
                                <Option key={w.code} value={w.code}>
                                    {w.name}
                                </Option>
                            ))}
                        </Select>
                    </div>
                </div>
                {vali.address && (
                    <p className="text-red-600 w-full">
                        ?????a ch??? kh??ng ???????c tr???ng
                    </p>
                )}
            </div>
            <div className="mb-10">
                <div className="_input">
                    <label htmlFor="node">Ghi ch??</label>
                    <input
                        type="text"
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
                    <a className="text-base font-bold text-sky-600">Gi??? h??ng</a>
                </Link>
                {carts.length ? (
                    <button
                        className="px-10 py-4 rounded text-white bg-sky-600"
                        type="submit"
                    >
                        Ph????ng th???c thanh to??n
                    </button>
                ) : (
                    <Fragment />
                )}
            </div>
        </form>
    );
};

export default ShipmentDetailsComponent;
