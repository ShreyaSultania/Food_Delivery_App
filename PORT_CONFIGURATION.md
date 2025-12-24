# Food Delivery App - Port Configuration

## Server Ports

### Frontend (Customer App)
- **Port**: 5173
- **URL**: http://localhost:5173
- **Purpose**: Customer-facing application for ordering food

### Admin Panel
- **Port**: 5174
- **URL**: http://localhost:5174
- **Purpose**: Admin dashboard for managing orders and food items

### Backend API
- **Port**: 4000
- **URL**: http://localhost:4000
- **Purpose**: REST API server

## Important Notes

1. **After Payment**: Stripe will redirect to `http://localhost:5173/verify` (Frontend)
2. **Admin Panel**: Access at `http://localhost:5174` 
3. **Customer App**: Access at `http://localhost:5173`

## Restart Required

After changing the port configuration, you need to:
1. Stop the Admin dev server (Ctrl+C)
2. Restart it with `npm run dev`
3. Admin will now run on port 5174
4. Frontend will run on port 5173

This prevents port conflicts and ensures payment redirects work correctly!
