# RBAC Implementation TODO

## Steps to Complete:

### 1. ✅ Update User Model (models/User.js)
- Add role field with enum ['user', 'admin'], default 'user'

### 2. ✅ Update Login Response (controllers/authController.js)
- Include user.role in login response

### 3. ✅ Create Authorization Middleware (middleware/authorize.js)
- Higher-order function authorize(...allowedRoles)

### 4. ✅ Create Analytics Routes (routes/analytics.js)
- GET /api/analytics/top-artists (admin only)
- GET /api/analytics/most-active-users (admin only)

### 5. ✅ Mount Analytics Routes (server.js)
- app.use('/api/analytics', analyticsRoutes);

## Post-Implementation Testing:
- ✅ All files updated successfully
- [ ] Create admin user (MongoDB shell: db.users.updateOne({_id: ObjectId('...')}, {$set: {role: 'admin'}}))
- [ ] Test login responses include role
- [ ] Test /api/analytics/top-artists:
  | No token | 401 |
  | User token | 403 |
  | Admin token | 200 |
- [ ] Restart server: cd server && npm run dev
- [ ] Verify no breaking changes to existing auth/posts routes

