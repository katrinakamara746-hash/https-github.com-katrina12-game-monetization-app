from fastapi import APIRouter
from backend.api.endpoints import auth, users, products, transactions, subscriptions, analytics, jokes

router = APIRouter()

# Include route modules
router.include_router(auth.router, prefix="/auth", tags=["auth"])
router.include_router(users.router, prefix="/users", tags=["users"])
router.include_router(products.router, prefix="/products", tags=["products"])
router.include_router(transactions.router, prefix="/transactions", tags=["transactions"])
router.include_router(subscriptions.router, prefix="/subscriptions", tags=["subscriptions"])
router.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
router.include_router(jokes.router, prefix="/jokes", tags=["jokes"])
