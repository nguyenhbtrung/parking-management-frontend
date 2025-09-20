import ParkingMap from "../../components/ParkingMap";

export default function BookingParkingMap() {
	return ParkingMap({ mapWidth: 500, mapHeight: 600, scale: 1, slots: [], isAdmin: false, onSlotClick: null });
}