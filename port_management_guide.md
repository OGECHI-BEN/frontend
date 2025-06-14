# Port Management Guide

## Finding Open Ports

### Method 1: Using netstat

1. Open Command Prompt or PowerShell as Administrator
2. Run the command: `netstat -ano | findstr LISTENING`
3. This will show all listening ports with their:
   - Protocol (TCP/UDP)
   - Local Address and Port
   - Foreign Address and Port
   - State
   - Process ID (PID)

### Method 2: Using Task Manager

1. Press Ctrl + Shift + Esc to open Task Manager
2. Go to the "Services" tab
3. Look for services that might be using ports

## Closing Ports

### Method 1: Using Task Manager

1. Note the PID (Process ID) from the netstat command
2. Open Task Manager (Ctrl + Shift + Esc)
3. Go to the "Details" tab
4. Find the process with the matching PID
5. Right-click and select "End Task"

### Method 2: Using Command Line

1. To kill a process using its PID:
   ```
   taskkill /PID <PID> /F
   ```
   Replace <PID> with the actual process ID

### Method 3: Using Windows Firewall

1. Open Windows Defender Firewall
2. Click on "Advanced settings"
3. Select "Inbound Rules" or "Outbound Rules"
4. Create a new rule to block specific ports

## Common Ports and Their Services

- Port 80: HTTP
- Port 443: HTTPS
- Port 3306: MySQL
- Port 135: Windows RPC
- Port 445: SMB

## Security Best Practices

1. Only keep necessary ports open
2. Regularly audit open ports
3. Use a firewall to control port access
4. Keep services and applications updated
5. Monitor for unauthorized port usage

## Troubleshooting

If you cannot close a port:

1. Ensure you have administrative privileges
2. Check if the service is critical for system operation
3. Verify if any applications depend on the port
4. Consider using Windows Firewall to block the port instead

## Notes

- Some ports are essential for system operation
- Always verify before closing ports
- Keep a record of port changes
- Document any custom port configurations

"scripts": {
// "dev": "vite",
"build": "vite build",
"preview": "vite preview",
"lint": "eslint . --fix",
"format": "prettier --write src/"
},
