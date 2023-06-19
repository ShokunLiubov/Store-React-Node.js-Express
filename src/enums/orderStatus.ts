export enum orderStatus {
	AVAILABILITY_IS_CHECK = 'Availability is check',
	AWAITING_SHIPMENT = 'Awaiting shipment',
	SENT = 'Sent',
	REFUSAL = 'Refusal',
	RECEIVED = 'Received',
}

export const orderStatusArray = Object.values(orderStatus)
