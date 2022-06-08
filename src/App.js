import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import './App.css';
import Active from './components/Carrier/Active/Active';
import ActiveDetails from './components/Carrier/Active/ActiveDetails';
import Awarded from './components/Carrier/Awarded/Awarded';
import AwardedDetails from './components/Carrier/Awarded/AwardedDetails';
import Completed from './components/Carrier/Completed/Completed';
import CompletedDetails from './components/Carrier/Completed/CompletedDetails';
import Drivers from './components/Carrier/Drivers/Drivers';
import Equipment from './components/Carrier/Equipment/Equipment';
import MyOfferDetails from './components/Carrier/MyOffers/MyOfferDetails';
import MyOffers from './components/Carrier/MyOffers/MyOffers';
import CarrierOrganisation from './components/Carrier/Organisation/Organisation';
// import PostTruck from './components/Carrier/PostTrucks/PostTruck';
import PostTruck from './components/Carrier/PostTrucks/PostNewTruck';
import PostTrucks from './components/Carrier/PostTrucks/PostTrucks';
import TruckDetails from './components/Carrier/PostTrucks/TruckDetails';
import RequestDetails from './components/Carrier/SearchRequests/RequestDetails';
import SearchRequests from './components/Carrier/SearchRequests/SearchRequests';
import Board from './components/CarrierSales/Board/Board';
import BoardEquipmentDetails from './components/CarrierSales/Board/BoardEquipmentDetails';
import BoardOffers from './components/CarrierSales/Board/BoardOffers';
import Booked from './components/CarrierSales/Booked/Booked';
import BookedDetails from './components/CarrierSales/Booked/BookedDetails';
import CarriersDetails from './components/CarrierSales/Carriers/CarrierDetails';
import Carriers from './components/CarrierSales/Carriers/Carriers';
import NewCarrier from './components/CarrierSales/Carriers/NewCarrier';
import CarrierSalesCompleted from './components/CarrierSales/Completed/Completed';
import CarrierSalesCompletedDetails from './components/CarrierSales/Completed/CompletedDetails';
import InTransit from './components/CarrierSales/InTransit/InTransit';
import InTransitDetails from './components/CarrierSales/InTransit/InTransitDetails';
import Pending from './components/CarrierSales/Pending/Pending';
import CarrierSalesPendingDetails from './components/CarrierSales/Pending/PendingDetails';
import PendingReview from './components/CarrierSales/PendingReview/PendingReview';
import PendingReviewDetails from './components/CarrierSales/PendingReview/PendingReviewDetails';
import ChangePassword from './components/ChangePassword';
import CreateAccount from './components/CreateAccount';
import ForgotPassword from './components/ForgotPassword';
import ForgotPasswordPhone from './components/ForgotPasswordPhone';
import InvitationCodeValidation from './components/InvitationCodeValidation';
import InvitedUser from './components/InvitedUser';
import Login from './components/Login';
import PasswordReset from './components/PasswordReset';
import { ConnectionContext } from './components/shared/ConnectionContext';
import Layout from './components/shared/Layout';
import Loading from './components/shared/loading/Loading';
import PrivateRoute from './components/shared/specializedRoutes/PrivateRoute.jsx';
import RedirectRoute from './components/shared/specializedRoutes/RedirectRoute';
import Account from './components/Shipper/Account/Account';
import BookedShipmentsDetails from './components/Shipper/Booked/BookedDetails';
import BookedShipments from './components/Shipper/Booked/BookedShipments';
import Commodity from './components/Shipper/Commodity/Commodity';
import CompletedShipmentDetails from './components/Shipper/Completed/CompletedDetails';
import CompletedShipments from './components/Shipper/Completed/CompletedShipments';
import Dashboard from './components/Shipper/Dashboard';
import Facility from './components/Shipper/Facility/Facility';
import NewShipment from './components/Shipper/NewShipment/NewShipment';
import ShipperOrganisation from './components/Shipper/Organisation/Organisation';
import PendingDetails from './components/Shipper/Pending/PendingDetails';
// import PendingShipments from "./components/Shipper/PendingShipments";
import PendingShipments from './components/Shipper/Pending/PendingShipments';
import Rfp from './components/Shipper/Rfp/Rfp';
import RfpDetails from './components/Shipper/Rfp/RfpDetails';
import RfpNew from './components/Shipper/Rfp/RfpNew';
import ShipperSalesActive from './components/ShipperSales/Active/Active';
import ShipperSalesActiveDetails from './components/ShipperSales/Active/ActiveDetails';
import ShipperSalesBoard from './components/ShipperSales/Board/Board';
import ShipperSalesBoardDetails from './components/ShipperSales/Board/BoardDetails';
import ShipperSalesCompleted from './components/ShipperSales/Completed/Completed';
import ShipperSalesCompletedDetails from './components/ShipperSales/Completed/CompletedDetails';
import NewShipmentDetails from './components/ShipperSales/NewShipments/NewShipmentDetails';
import NewShipments from './components/ShipperSales/NewShipments/NewShipments';
import ShipperSalesRfp from './components/ShipperSales/Rfp/Rfp';
import ShipperSalesRfpDetails from './components/ShipperSales/Rfp/RfpDetails';
import NewShipper from './components/ShipperSales/Shippers/NewShipper';
import ShippersDetails from './components/ShipperSales/Shippers/ShipperDetails';
import Shippers from './components/ShipperSales/Shippers/Shippers';
import ValidateEmail from './components/ValidateEmail';
import ValidateSmsCode from './components/ValidateSmsCode';
import { AUTHORIZATIONS, DOMAINS } from './enums/authorizations';
import { getAccessToken } from './helpers/tokenStorage';
import utils from './helpers/utils';
import './ShipperDetails.css';
import * as authActions from './store/actions/authActions';

const GOOGLE_MAP_API_KEY = process.env.REACT_APP_PLACES_API_KEY;

function App({ history }) {
	utils.init();

	const user = useSelector(state => state.authentication.user);
	const [mapsLoaded, setMapsLoaded] = useState(false);
	const dispatch = useDispatch();
	let { createConnection } = useContext(ConnectionContext);

	useEffect(() => {
		if (getAccessToken() && !user) {
			dispatch(authActions.getUserInfo({ history: history }));
		}
	});

	useEffect(() => {
		if (user) {
			createConnection(user);
		}
	}, [user]);

	// load google map script
	const loadGoogleMapScript = callback => {
		if (
			typeof window.google === 'object' &&
			typeof window.google.maps === 'object'
		) {
			callback();
		} else {
			const googleMapScript = document.createElement('script');
			googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
			window.document.body.appendChild(googleMapScript);
			googleMapScript.addEventListener('load', callback);
		}
	};

	useEffect(() => {
		loadGoogleMapScript(() => {
			console.log('App: Google Script loaded');
			setMapsLoaded(true);
		});
	}, []);

	// To avoid errors when loading google maps libraries is delayed
	if (!mapsLoaded) {
		return <Loading />;
	} else {
		return (
			<>
				<Layout></Layout>
				<Switch>
					<RedirectRoute exact path="/" component={Login} />
					<RedirectRoute exact path="/login" component={Login} />
					<RedirectRoute exact path="/register" component={CreateAccount} />
					<RedirectRoute
						exact
						path="/forgotPassword"
						component={ForgotPassword}
					/>
					<RedirectRoute
						exact
						path="/forgotPasswordPhone"
						component={ForgotPasswordPhone}
					/>
					<RedirectRoute
						exact
						path="/validateCode"
						component={ValidateSmsCode}
					/>
					<RedirectRoute
						exact
						path="/changePassword"
						component={ChangePassword}
					/>
					<RedirectRoute
						exact
						path="/passwordReset"
						component={PasswordReset}
					/>
					<RedirectRoute
						exact
						path="/validateEmail"
						component={ValidateEmail}
					/>
					<RedirectRoute
						exact
						path="/invitation"
						component={InvitationCodeValidation}
					/>
					<RedirectRoute
						exact
						path="/invitationLogin"
						component={InvitedUser}
					/>
					<PrivateRoute
						exact
						path="/carrier"
						roles={['carrier']}
						component={Dashboard}
					/>
					<PrivateRoute
						exact
						path="/carrier/account"
						roles={['carrier']}
						component={Account}
					/>
					<PrivateRoute
						exact
						path="/carrier/searchLoads/details"
						roles={['carrier']}
						component={RequestDetails}
					/>
					<PrivateRoute
						exact
						path="/carrier/searchLoads/:tab"
						roles={['carrier']}
						authorizations={[
							{
								domain: DOMAINS.CARRIER,
								auth: AUTHORIZATIONS.SEARCH_LOADS
							}
						]}
						component={SearchRequests}
					/>
					<PrivateRoute
						exact
						path="/carrier/myOffers"
						roles={['carrier']}
						authorizations={[
							{
								domain: DOMAINS.CARRIER,
								auth: AUTHORIZATIONS.SEE_MY_OFFERS_BOARD
							}
						]}
						component={MyOffers}
					/>
					<PrivateRoute
						exact
						path="/carrier/myOffers/details"
						roles={['carrier']}
						component={MyOfferDetails}
					/>
					<PrivateRoute
						exact
						path="/carrier/awarded"
						roles={['carrier']}
						component={Awarded}
					/>
					<PrivateRoute
						exact
						path="/carrier/awarded/details"
						roles={['carrier']}
						component={AwardedDetails}
					/>
					<PrivateRoute
						exact
						path="/carrier/active/details"
						roles={['carrier']}
						component={ActiveDetails}
					/>
					<PrivateRoute
						exact
						path="/carrier/active/:tab"
						roles={['carrier']}
						authorizations={[
							{
								domain: DOMAINS.CARRIER,
								auth: AUTHORIZATIONS.SEE_ALL_ACTIVE_SHIPMENTS
							}
						]}
						component={Active}
					/>
					<PrivateRoute
						exact
						path="/carrier/completed/details"
						roles={['carrier']}
						component={CompletedDetails}
					/>
					<PrivateRoute
						exact
						path="/carrier/completed/:tab"
						roles={['carrier']}
						component={Completed}
					/>
					<PrivateRoute
						exact
						path="/carrier/postTrucks"
						roles={['carrier']}
						component={PostTrucks}
					/>
					<PrivateRoute
						exact
						path="/carrier/postTrucks/new"
						roles={['carrier']}
						authorizations={[
							{
								domain: DOMAINS.CARRIER,
								auth: AUTHORIZATIONS.POST_TRUCK
							}
						]}
						component={PostTruck}
					/>
					<PrivateRoute
						exact
						path="/carrier/postTrucks/details"
						roles={['carrier']}
						component={TruckDetails}
					/>
					<PrivateRoute
						exact
						path="/carrier/drivers/:tab"
						roles={['carrier']}
						component={Drivers}
					/>
					<PrivateRoute
						exact
						path="/carrier/equipment/:tab"
						roles={['carrier']}
						component={Equipment}
					/>
					<PrivateRoute
						exact
						path="/carrier/organisation/:tab"
						roles={['carrier']}
						component={CarrierOrganisation}
					/>
					<PrivateRoute
						exact
						path="/carrierSales"
						roles={['carrier-sales']}
						component={Dashboard}
					/>
					<PrivateRoute
						exact
						path="/carrierSales/account"
						roles={['carrier-sales']}
						component={Account}
					/>
					<PrivateRoute
						exact
						path="/carrierSales/pending/details"
						roles={['carrier-sales']}
						component={CarrierSalesPendingDetails}
					/>
					<PrivateRoute
						exact
						path="/carrierSales/pending/editShipment"
						roles={['carrier-sales']}
						component={NewShipment}
					/>
					<PrivateRoute
						exact
						path="/carrierSales/pending/:tab"
						roles={['carrier-sales']}
						component={Pending}
					/>

					<PrivateRoute
						exact
						path="/carrierSales/board/details"
						roles={['carrier-sales']}
						component={BoardOffers}
					/>
					<PrivateRoute
						exact
						path="/carrierSales/board/equipmentDetails"
						roles={['carrier-sales']}
						component={BoardEquipmentDetails}
					/>
					<PrivateRoute
						exact
						path="/carrierSales/board/newEquipmentRequest"
						roles={['carrier-sales']}
						component={PostTruck}
					/>
					<PrivateRoute
						exact
						path="/carrierSales/board/:tab"
						roles={['carrier-sales']}
						component={Board}
					/>
					<PrivateRoute
						exact
						path="/carrierSales/booked"
						roles={['carrier-sales']}
						component={Booked}
					/>
					<PrivateRoute
						exact
						path="/carrierSales/booked/details"
						roles={['carrier-sales']}
						component={BookedDetails}
					/>
					<PrivateRoute
						exact
						path="/carrierSales/inTransit/details"
						roles={['carrier-sales']}
						component={InTransitDetails}
					/>
					<PrivateRoute
						exact
						path="/carrierSales/inTransit/:tab"
						roles={['carrier-sales']}
						component={InTransit}
					/>
					<PrivateRoute
						exact
						path="/carrierSales/pendingReview/details"
						roles={['carrier-sales']}
						component={PendingReviewDetails}
					/>
					<PrivateRoute
						exact
						path="/carrierSales/pendingReview/:tab"
						roles={['carrier-sales']}
						component={PendingReview}
					/>
					<PrivateRoute
						exact
						path="/carrierSales/completed"
						roles={['carrier-sales']}
						component={CarrierSalesCompleted}
					/>
					<PrivateRoute
						exact
						path="/carrierSales/completed/details"
						roles={['carrier-sales']}
						component={CarrierSalesCompletedDetails}
					/>
					<PrivateRoute
						exact
						path="/carrierSales/carriers/details"
						roles={['carrier-sales']}
						component={CarriersDetails}
					/>
					<PrivateRoute
						exact
						path="/carrierSales/carriers/:tab"
						roles={['carrier-sales']}
						component={Carriers}
					/>
					<PrivateRoute
						exact
						path="/carrierSales/editCarrier"
						roles={['carrier-sales']}
						component={NewCarrier}
					/>
					<PrivateRoute
						exact
						path="/carrierSales/newCarrier"
						roles={['carrier-sales']}
						component={NewCarrier}
					/>
					<PrivateRoute
						exact
						path="/shipper"
						roles={['shipper']}
						component={Dashboard}
					/>
					<PrivateRoute
						exact
						path="/shipper/rfp/new"
						roles={['shipper']}
						authorizations={[
							{
								domain: DOMAINS.SHIPPER,
								auth: AUTHORIZATIONS.UPLOAD_RFP
							}
						]}
						component={RfpNew}
					/>
					<PrivateRoute
						exact
						path="/shipper/rfp/details"
						roles={['shipper']}
						component={RfpDetails}
					/>
					<PrivateRoute
						exact
						path="/shipper/rfp/:tab"
						roles={['shipper']}
						authorizations={[
							{
								domain: DOMAINS.SHIPPER,
								auth: AUTHORIZATIONS.SEE_RFP_BOARD
							}
						]}
						component={Rfp}
					/>
					<PrivateRoute
						path="/shipper/newShipment"
						roles={['shipper']}
						authorizations={[
							{
								domain: DOMAINS.SHIPPER,
								auth: AUTHORIZATIONS.POST_NEW_SHIPMENT
							}
						]}
						component={NewShipment}
					/>
					<PrivateRoute
						path="/shipper/editShipment"
						roles={['shipper']}
						component={NewShipment}
					/>
					<PrivateRoute
						exact
						path="/shipper/pending/details"
						roles={['shipper']}
						component={PendingDetails}
					/>
					<PrivateRoute
						exact
						path="/shipper/pending/:tab"
						roles={['shipper']}
						authorizations={[
							{
								domain: DOMAINS.SHIPPER,
								auth: AUTHORIZATIONS.SEE_PENDING_BOARD
							}
						]}
						component={PendingShipments}
					/>
					<PrivateRoute
						exact
						path="/shipper/booked/details"
						roles={['shipper']}
						component={BookedShipmentsDetails}
					/>
					<PrivateRoute
						exact
						path="/shipper/booked/:tab"
						roles={['shipper']}
						authorizations={[
							{
								domain: DOMAINS.SHIPPER,
								auth: AUTHORIZATIONS.SEE_ALL_BOOKED_SHIPMENT
							}
						]}
						component={BookedShipments}
					/>
					<PrivateRoute
						exact
						path="/shipper/completed/details"
						roles={['shipper']}
						component={CompletedShipmentDetails}
					/>
					<PrivateRoute
						exact
						path="/shipper/completed/:tab"
						roles={['shipper']}
						authorizations={[
							{
								domain: DOMAINS.SHIPPER,
								auth: AUTHORIZATIONS.SEE_ALL_COMPLETED_SHIPMENTS
							}
						]}
						component={CompletedShipments}
					/>
					<PrivateRoute
						exact
						path="/shipper/commodity"
						roles={['shipper']}
						component={Commodity}
					/>
					<PrivateRoute
						exact
						path="/shipper/facility"
						roles={['shipper']}
						component={Facility}
					/>
					<PrivateRoute
						exact
						path="/shipper/account"
						roles={['shipper']}
						component={Account}
					/>
					<PrivateRoute
						exact
						path="/shipper/organisation/:tab"
						roles={['shipper']}
						component={ShipperOrganisation}
					/>
					<PrivateRoute
						exact
						path="/shipper-sales"
						roles={['shipper-sales']}
						component={Dashboard}
					/>
					<PrivateRoute
						exact
						path="/customerSales"
						roles={['shipper-sales']}
						component={Dashboard}
					/>
					<PrivateRoute
						exact
						path="/customerSales/account"
						roles={['shipper-sales']}
						component={Account}
					/>
					<PrivateRoute
						exact
						path="/customerSales/newShipments/details"
						roles={['shipper-sales']}
						component={NewShipmentDetails}
					/>
					<PrivateRoute
						exact
						path="/customerSales/newShipments/:tab"
						roles={['shipper-sales']}
						component={NewShipments}
					/>
					<PrivateRoute
						exact
						path="/customerSales/newShipment"
						roles={['shipper-sales']}
						component={NewShipment}
					/>
					<PrivateRoute
						exact
						path="/customerSales/editShipment"
						roles={['shipper-sales']}
						component={NewShipment}
					/>
					<PrivateRoute
						exact
						path="/customerSales/rfp/details"
						roles={['shipper-sales']}
						component={ShipperSalesRfpDetails}
					/>
					<PrivateRoute
						exact
						path="/customerSales/rfp/:tab"
						roles={['shipper-sales']}
						component={ShipperSalesRfp}
					/>
					<PrivateRoute
						exact
						path="/customerSales/board"
						roles={['shipper-sales']}
						component={ShipperSalesBoard}
					/>
					<PrivateRoute
						exact
						path="/customerSales/board/details"
						roles={['shipper-sales']}
						component={ShipperSalesBoardDetails}
					/>
					<PrivateRoute
						exact
						path="/customerSales/active/details"
						roles={['shipper-sales']}
						component={ShipperSalesActiveDetails}
					/>
					<PrivateRoute
						exact
						path="/customerSales/active/:tab"
						roles={['shipper-sales']}
						component={ShipperSalesActive}
					/>
					<PrivateRoute
						exact
						path="/customerSales/completed"
						roles={['shipper-sales']}
						component={ShipperSalesCompleted}
					/>
					<PrivateRoute
						exact
						path="/customerSales/completed/details"
						roles={['shipper-sales']}
						component={ShipperSalesCompletedDetails}
					/>
					<PrivateRoute
						exact
						path="/customerSales/shippers/details"
						roles={['shipper-sales']}
						component={ShippersDetails}
					/>
					<PrivateRoute
						exact
						path="/customerSales/shippers/:tab"
						roles={['shipper-sales']}
						component={Shippers}
					/>
					<PrivateRoute
						exact
						path="/customerSales/newShipper"
						roles={['shipper-sales']}
						component={NewShipper}
					/>
					<PrivateRoute
						exact
						path="/customerSales/editShipper"
						roles={['shipper-sales']}
						component={NewShipper}
					/>
				</Switch>
			</>
		);
	}
}

export default App;
