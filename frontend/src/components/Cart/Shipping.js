import React, { Fragment, useState } from "react";
import "./Shipping.css";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import PublicIcon from "@mui/icons-material/Public";
import { Country, State } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "@blaumaus/react-alert";
import CheckOutSteps from "./CheckOutSteps.js";
import { saveShippingInfo } from "../../actions/cartAction";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const Shipping = () => {
  document.title = `Shipping Details | Daintree`;

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { shippingInfo } = useSelector((state) => state.cart);
  const { user, loading } = useSelector((state) => state.user);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pincode, setPincode] = useState(shippingInfo.pincode);
  const [mobileNumber, setMobileNumber] = useState(
    user.mobileNumber ? user.mobileNumber : shippingInfo.mobileNumber
  );

  const shippingSubmit = (e) => {
    e.preventDefault();
    if (mobileNumber.length < 10 || mobileNumber.length > 10) {
      alert.error("Phone Number sholud contain only 10 digits.");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pincode, mobileNumber })
    );
    navigate(`/order/confirm`);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <CheckOutSteps activeStep={0} />
          <div className="shippingContainer">
            <div className="shippingBox">
              <h2 className="shippingHeading">Shipping Details</h2>
              <form
                className="shippingForm"
                encType="multipart/form-data"
                onSubmit={shippingSubmit}
              >
                <div>
                  <HomeIcon />
                  <input
                    type="text"
                    placeholder="Address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div>
                  <LocationCityIcon />
                  <input
                    type="text"
                    placeholder="City"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div>
                  <PinDropIcon />
                  <input
                    type="number"
                    placeholder="Pin Code"
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  />
                </div>
                <div>
                  <PhoneAndroidIcon />
                  <input
                    type="number"
                    placeholder="Mobile Number"
                    required
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                </div>
                <div>
                  <PublicIcon />
                  <select
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="">Country</option>
                    {Country &&
                      Country.getAllCountries().map((item) => (
                        <option value={item.isoCode} key={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>

                {country && (
                  <div>
                    <TransferWithinAStationIcon />
                    <select
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    >
                      <option value="">State</option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option value={item.name} key={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                )}
                <input
                  type="submit"
                  value="Continue"
                  className="shippingBtn"
                  disabled={state ? false : true}
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Shipping;
