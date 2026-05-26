# Tranvexa | Smart Fleet & Logistics Dispatch Engine

Tranvexa is an industrial, asset-first logistics engine inspired by market leaders like Samsara and Fleetio. Built as a high-density management portal, the platform provides real-time telematics tracking, centralized driver-to-vehicle allocation mapping, automated gate-pass validation, and intelligent cargo dispatch manifests to optimize yard throughput.

## Core Capabilities
* **Dynamic Fleet Allocation Engine**: Prevent multi-booking asset clashes with status-locked vehicle deployment mechanics.
* **Standby Operator Gatekeeping**: Automated verification checks tracking driver availability parameters and digital gate-pass expiration dates.
* **Unified Manifest Dispatch System**: High-density cargo loading queues with relational asset protection frameworks.
* **Enterprise UI Grid**: High-contrast, scannable industrial monitoring panels powered by Vite, React Router, and Lucide vector nodes.

## Technology Infrastructure

### Frontend Layer
* **Framework**: React 18 (Vite Bundler Engine)
* **Routing Strategy**: Client-side client-navigation (`react-router-dom`)
* **State Topology**: Standalone Global Context Provider Layer (`StoreProvider`)
* **Design Engine**: Tailwind CSS (Enterprise Dark Mode & Utility Grid layouts)
* **Iconography**: Lucide React Vector Components

### Backend Layer
* **Runtime Core**: Node.js v24
* **Application Framework**: Express.js
* **Database Platform**: MongoDB Atlas Cluster
* **Object Mapping Engine**: Mongoose ODM
* **Cross-Origin Framework**: Configured CORS policy matching production edge instances

---

## Workspace Directory Architecture

```text
Tranvexa/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── data.js
│   ├── controllers/
│   │   ├── driverController.js
│   │   ├── tripController.js
│   │   └── vehicleController.js
│   ├── models/
│   │   ├── Driver.js
│   │   ├── Trip.js
│   │   └── Vehicle.js
│   ├── routes/
│   │   ├── driverRoutes.js
│   │   ├── tripRoutes.js
│   │   └── vehicleRoutes.js
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Footer.jsx
    │   │   ├── Navbar.jsx
    │   │   └── Sidebar.jsx
    │   ├── context/
    │   │   ├── Store.jsx
    │   │   └── useStore.js
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── DispatchBoard.jsx
    │   │   ├── Driver.jsx
    │   │   ├── Trips.jsx
    │   │   └── Vehicles.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   └── main.jsx
