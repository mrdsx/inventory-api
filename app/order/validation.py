from fastapi import HTTPException, status

from order_item.schemas import OrderItemPayload


def validate_order_items(items: list[OrderItemPayload]) -> None:
    if len(items) == 0:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Order items list is empty",
        )
