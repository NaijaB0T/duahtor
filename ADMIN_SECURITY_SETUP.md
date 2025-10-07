# DUAHTOR Admin Security Setup

The admin pages (`/admin/*`) are now protected with multiple layers of authentication for maximum security.

## Current Protection

### 1. **Basic Authentication (Currently Active)**
- **Username**: `admin`
- **Password**: `duahtor-admin-2025`
- **Access**: Visit `/admin/waitlist` and enter credentials when prompted

### 2. **Cloudflare Access Integration (Recommended)**
For enterprise-grade security, set up Cloudflare Access:

#### Step 1: Enable Cloudflare Access
1. Go to your Cloudflare dashboard
2. Navigate to **Zero Trust** → **Access** → **Applications**
3. Click **Add an application**

#### Step 2: Configure Application
1. **Application Type**: Self-hosted
2. **Application Name**: DUAHTOR Admin
3. **Domain**: `duahtor.bkweah1.workers.dev`
4. **Path**: `/admin/*`
5. **Session Duration**: 24 hours (or your preference)

#### Step 3: Set Access Policies
1. **Policy Name**: Admin Access
2. **Action**: Allow
3. **Rules**: 
   - Include → Emails → Add your admin email addresses
   - OR Include → Email domain → Add your organization domain

#### Step 4: Additional Security (Optional)
- **Require MFA**: Enable for extra security
- **Country restrictions**: Limit access by geographic location
- **Device posture**: Require managed devices

### 3. **Environment Variables**
Current admin credentials are stored as Cloudflare Workers environment variables:
- `ADMIN_USERNAME`: The basic auth username
- `ADMIN_PASSWORD`: The basic auth password

To update these:
```bash
wrangler secret put ADMIN_PASSWORD
# Enter new password when prompted
```

## Access Methods

### Method 1: Cloudflare Access (Recommended)
Once configured, users will:
1. Visit `/admin/waitlist`
2. Be redirected to Cloudflare Access login
3. Authenticate with their organization email
4. Access granted automatically

### Method 2: Basic Authentication (Fallback)
If Cloudflare Access is not configured:
1. Visit `/admin/waitlist`
2. Browser will prompt for username/password
3. Enter: `admin` / `duahtor-admin-2025`

## Security Features

### ✅ **Currently Implemented**
- Middleware-based route protection
- Basic authentication fallback
- Environment variable credential storage
- User authentication status display
- Unauthorized access blocking with clear error messages

### 🔒 **With Cloudflare Access**
- Enterprise SSO integration
- Multi-factor authentication
- Audit logging
- Session management
- Geographic restrictions
- Device compliance checks

## Admin Dashboard Features

The protected admin dashboard provides:

1. **Authentication Status**
   - Shows current user and authentication method
   - Security badge indicator

2. **Waitlist Statistics**
   - Total registrations
   - Breakdown by user role (Student, Parent, Educator, Other)

3. **Detailed User Table**
   - Full name and contact information
   - User role with color-coded badges
   - Location (county/country)
   - Registration timestamp

4. **Real-time Data**
   - Refresh button for latest data
   - Direct database queries

## Troubleshooting

### Issue: Access Denied
- **Solution**: Verify credentials or Cloudflare Access configuration

### Issue: Page Won't Load
- **Solution**: Check if middleware is properly deployed

### Issue: Wrong User Shown
- **Solution**: Clear browser cache or check Cloudflare Access headers

## Next Steps

1. **Immediate**: Use basic auth with provided credentials
2. **Recommended**: Set up Cloudflare Access for your organization
3. **Optional**: Configure additional admin pages (user management, analytics, etc.)

---

**Current Admin Access**:
- **URL**: https://duahtor.bkweah1.workers.dev/admin/waitlist
- **Username**: admin
- **Password**: duahtor-admin-2025

**Security Note**: Change the default password in production and consider enabling Cloudflare Access for enhanced security.