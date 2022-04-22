import { useCallback, useEffect, useState } from "react";
import API from "../api";
import { Provincial, District, Ward } from "../api/repository/countriesAPI";

export interface ValueAddress {
    provincial?: Provincial;
    district?: District;
    ward?: Ward;
}

const useAddress = () => {
    const [provincials, setProvincials] = useState<Provincial[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [addressValue, setAddressValue] = useState<ValueAddress>({});

    console.log("addressValue", addressValue);

    const getProvincials = useCallback(async () => {
        try {
            const res = await API.countries.getProvincials();
            setProvincials(res.data);
        } catch {
            setProvincials([]);
        }
    }, []);
    const getDistricts = useCallback(async (id: string) => {
        try {
            const res = await API.countries.getDistricts(id);
            setDistricts(res.data);
        } catch {
            setDistricts([]);
        }
    }, []);
    const getWards = useCallback(async (id: string) => {
        try {
            const res = await API.countries.getWards(id);
            setWards(res.data);
        } catch {
            setWards([]);
        }
    }, []);

    useEffect(() => {
        getProvincials();
    }, [getProvincials]);

    useEffect(() => {
        if (typeof addressValue.provincial !== "undefined") {
            getDistricts(addressValue.provincial.code);
        }
    }, [getDistricts, addressValue.provincial]);

    useEffect(() => {
        if (typeof addressValue.district !== "undefined") {
            getWards(addressValue.district.code);
        } else {
            setAddressValue((val) => {
                return { ...val, ward: undefined };
            });
        }
    }, [getWards, addressValue.district]);

    useEffect(() => {
        if (districts.length) {
            setAddressValue((val) => {
                return { ...val, district: undefined };
            });
        }
    }, [districts.length]);

    useEffect(() => {
        if (wards.length) {
            setAddressValue((val) => {
                return { ...val, ward: undefined };
            });
        }
    }, [wards.length]);

    return { provincials, districts, wards, addressValue, setAddressValue };
};
export default useAddress;
