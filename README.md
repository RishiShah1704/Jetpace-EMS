# Jetpace EMS — Environment Monitoring System

A Node-RED based temperature monitoring system that reads data from Modbus slave devices, displays a live dashboard, triggers email alerts, and logs all activity to a database.

## Features

- **Live temperature table** — real-time status for all configured slave devices (ONLINE / OFFLINE / ALERT)
- **Alarm detection** — per-device Low Set Point (LSP) and High Set Point (HSP) thresholds
- **Email alerts** — sends notifications to a configured recipient when a device enters ALERT state, with a 3-minute cooldown per device
- **Event log** — tracks system events (startup, login, logout, device settings changes, alarms)
- **Daily reports** — temperature history with PDF export
- **Alarm report** — filtered alarm history with PDF export
- **User authentication** — admin and viewer roles with session management
- **Device settings** — configure destination label, LSP, HSP, and notification email per device
- **Contact list** — manage email recipients via a CSV file, shown as a dropdown in device settings

## Tech Stack

- **Node-RED** — flow-based runtime and dashboard
- **Modbus TCP** — reads temperature registers from slave devices
- **Microsoft SQL Server** — stores temperature logs, event logs
- **Gmail SMTP** — sends temperature alert emails
- **Node.js** — underlying runtime

## Project Structure

```
.node-red/
├── flows.json          # Main Node-RED flow definition
├── flows_cred.json     # Encrypted credentials (SMTP, etc.)
├── settings.js         # Node-RED runtime settings
├── device_config.json  # Active slave IDs and per-device settings
├── contacts.csv        # Email contact list (Name, Email)
├── package.json        # Node-RED dependencies
└── start.js            # Entry point
```

## Configuration

### Adding Devices
Enter slave IDs in the **Active Slave IDs** field on the dashboard (e.g. `1,2,5,10-15`) and click **Apply**.

### Device Settings
Click **Edit** on any online device to set:
- **Destination** — label for the location
- **LSP / HSP** — low and high set point thresholds (°C)
- **Notify Email** — recipient address for alerts (selected from `contacts.csv`)

### Email Contacts
Edit `contacts.csv` to manage the dropdown list in device settings:
```
Name,Email
John Smith,john@example.com
Jane Doe,jane@example.com
```

### Email Settings
Go to the user menu → **Email Settings** to configure the sender address. Requires the email settings password.

## Requirements

- Node.js v18+
- Node-RED v3+
- Microsoft SQL Server
- Gmail account with App Password enabled

## Running

```bash
cd C:\SPB_Data\.node-red
node start.js
```

Dashboard available at: `http://localhost:1880/dashboard`
