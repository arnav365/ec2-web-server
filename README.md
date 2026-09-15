# Project 3: EC2-Based Web Server

[![AWS EC2](https://img.shields.io/badge/AWS-EC2-orange.svg)](https://aws.amazon.com/ec2/)
[![Server](https://img.shields.io/badge/Web_Server-Apache2-red.svg)](https://httpd.apache.org/)
[![OS](https://img.shields.io/badge/Linux-Ubuntu_24.04_LTS-E95420.svg)](https://ubuntu.com/)
[![Tech](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla_JS-blue.svg)](#technologies)
[![Status](https://img.shields.io/badge/Project_Status-Deployed-brightgreen.svg)](#project-status)

> **Portfolio Project 3:** A responsive, lightweight web application and deployment workflow demonstrating Linux server administration, Apache web server configuration, and virtual compute networking on Amazon Web Services (AWS EC2).

---

## 📌 Project Overview

This project represents the third milestone in an AWS Cloud Computing portfolio. It demonstrates how to architect, configure, and host a static web platform on a cloud-hosted virtual machine using **Amazon Elastic Compute Cloud (EC2)** and the **Apache HTTP Server (`apache2`)**.

The web application is designed with modern cloud engineering aesthetics (responsive dark/light theme, interactive architecture flow, copyable bash commands, and system status indicators) and contains zero external runtime dependencies for direct serving via `/var/www/html/`.

---

## 🎯 Objective

1. **Demonstrate Cloud Infrastructure Fundamentals:** Provision and administer an AWS EC2 Ubuntu Linux instance.
2. **Configure Web Server Software:** Install, enable, and monitor the Apache HTTP Server daemon using `systemd`.
3. **Manage Cloud Network Security:** Configure AWS Security Groups to allow incoming web traffic (Port 80) while securing remote SSH administration (Port 22).
4. **Automate Server Deployment:** Create a modular shell script (`server-setup.sh`) to automate Apache installation and web root provisioning.

---

## 🏛️ System Architecture

The following diagram illustrates the lifecycle of a client HTTP request to the website hosted on the Amazon EC2 instance:

```text
Internet
   ↓
AWS EC2
   ↓
Ubuntu 24.04 LTS
   ↓
Apache2
   ↓
/var/www/html/
   ↓
Project 3 Website
```

---

## 💻 Technologies Used

| Technology | Category | Purpose |
| :--- | :--- | :--- |
| **Amazon EC2** | Cloud Infrastructure | Virtual compute instance hosting the Linux environment |
| **Ubuntu Linux 24.04 LTS** | Operating System | Host OS providing system services and package management |
| **Apache2** | Web Server | Open-source HTTP daemon serving static assets |
| **HTML5** | Frontend | Semantic markup and accessibility structure |
| **CSS3** | Frontend | Custom styling, glassmorphism, responsive grid & light/dark theme |
| **Vanilla JavaScript** | Frontend | Theme toggling, active scroll spy, mobile drawer & clipboard actions |
| **Bash** | Automation | Server provisioning script (`server-setup.sh`) |
| **Git & GitHub** | Version Control | Source code management and portfolio tracking |

---

## 📁 Project Structure

```text
EC2-Web-Server/
├── index.html                  # Main responsive single-page web interface
├── css/
│   └── style.css               # Design system, CSS variables & theme rules
├── js/
│   └── script.js               # Theme toggle, mobile menu & interactive handlers
├── assets/                     # Static media and icons directory
├── deployment/
│   └── server-setup.sh         # Automated bash script for Ubuntu/Apache setup
└── README.md                   # Comprehensive project documentation
```

---

## 🚦 Project Status

> **Important Portfolio Note:** This project is successfully deployed to a live AWS EC2 instance.

- [x] **Website Development:** Completed
- [x] **EC2 Instance:** Deployed
- [x] **Ubuntu Server:** Running
- [x] **Apache2:** Running
- [x] **Website Deployment:** Completed
- [x] **Public HTTP Access:** Working
- [ ] **HTTPS/SSL:** Planned
- [ ] **Elastic IP:** Optional/Planned

---

## 🖥️ Local Setup & Preview

To test and view the website locally on your workstation before cloud deployment:

### Option 1: Python Built-in HTTP Server
```bash
# Navigate to the project directory
cd "EC2-Web-Server"

# Start a local web server on port 8000
python -m http.server 8000
# (Or on Python 2: python -m SimpleHTTPServer 8000)
```
Open your browser and navigate to: `http://localhost:8000`

### Option 2: Node.js `npx serve`
```bash
npx serve .
```

### Option 3: Direct Browser File
Simply open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge).

---

## 🚀 Step-by-Step AWS EC2 Deployment Guide

Follow these steps to deploy this project to an AWS EC2 instance:

### 1. Launch an EC2 Instance
1. Log in to the [AWS Management Console](https://console.aws.amazon.com/ec2/).
2. Navigate to **EC2 Dashboard** ➔ **Launch Instance**.
3. Configure the following parameters:
   - **Name:** `EC2-Web-Server-Portfolio`
   - **Application and OS Images (AMI):** `Ubuntu Server 24.04 LTS (HVM), SSD Volume Type`
   - **Instance Type:** `t3.micro` (Free Tier eligible)
   - **Key Pair:** Create or select an existing `.pem` RSA key pair (e.g., `ec2-portfolio-key.pem`). Keep this private key secure and DO NOT commit it to version control.

### Deployment Details
- **Platform:** AWS EC2
- **OS:** Ubuntu 24.04 LTS
- **Instance Type:** t3.micro
- **Web Server:** Apache2
- **Firewall:** AWS Security Group
- **Networking:**
  - **SSH (Port 22):** Restricted to My IP for secure remote access.
  - **HTTP (Port 80):** Publicly accessible for website traffic.
- **Deployment Method:** SCP (Secure Copy Protocol) to transfer files to `/var/www/html/`
- **Access:** The website is currently accessed through the EC2 public IPv4 address.
- **Security:** HTTPS is not configured yet. No AWS credentials, private keys, passwords, or secrets are exposed in this repository.
4. Click **Launch Instance**.

### 2. Configure Security Group Rules
Ensure the Security Group attached to your EC2 instance has the following **Inbound Rules**:

| Type | Protocol | Port Range | Source | Description |
| :--- | :--- | :--- | :--- | :--- |
| **SSH** | TCP | `22` | `My IP` | Secure remote shell administration |
| **HTTP** | TCP | `80` | `0.0.0.0/0` (Anywhere IPv4) | Public web visitor traffic |

### 3. Connect via SSH
From your local terminal, navigate to the folder containing your private key and connect:
```bash
# Secure private key permissions (required by SSH clients)
chmod 400 ec2-portfolio-key.pem

# Connect to Ubuntu EC2 instance
ssh -i "ec2-portfolio-key.pem" ubuntu@<YOUR_EC2_PUBLIC_IP>
```

### 4. Run the Server Setup Script
Once inside the EC2 Linux shell, run the setup automation script:
```bash
# Create deployment script or clone the repository
git clone https://github.com/your-username/EC2-Web-Server.git
cd EC2-Web-Server

# Make script executable and run setup
chmod +x deployment/server-setup.sh
./deployment/server-setup.sh
```

Alternatively, run the manual commands:
```bash
# Update package repositories
sudo apt-get update -y

# Install Apache2
sudo apt-get install -y apache2

# Enable and start Apache service
sudo systemctl enable apache2
sudo systemctl start apache2

# Check service status
sudo systemctl status apache2
```

### 5. Deploy Website Files to `/var/www/html/`
Copy the project files to Apache's default web directory:
```bash
# Copy site files to Apache document root
sudo cp -r index.html css/ js/ assets/ /var/www/html/

# Ensure appropriate file ownership and permissions
sudo chown -R www-data:www-data /var/www/html
sudo chmod -R 755 /var/www/html
```

### 6. Verify and Access Live Site
Open your browser and navigate to:
```text
http://<YOUR_EC2_PUBLIC_IP>
```
*(Note: Ensure you use `http://` rather than `https://` until SSL certificates are configured).*

---

## 🔧 Troubleshooting Checklist

| Issue | Potential Cause | Solution |
| :--- | :--- | :--- |
| **Browser times out (Connection Refused)** | Security Group blocking Port 80 | Go to EC2 Console ➔ Security Groups ➔ Edit Inbound Rules ➔ Add `HTTP` on Port `80` with Source `0.0.0.0/0`. |
| **SSH permission denied (`UNPROTECTED PRIVATE KEY FILE`)** | `.pem` key file permissions too open | Run `chmod 400 your-key.pem` on Linux/macOS or modify NTFS permissions on Windows. |
| **Default Apache Ubuntu welcome page shows instead of website** | `/var/www/html/index.html` not overwritten | Remove default file via `sudo rm /var/www/html/index.html` and re-copy your project `index.html`. |
| **Apache service fails to start** | Another service occupying Port 80 or syntax error | Run `sudo apache2ctl configtest` and `sudo journalctl -u apache2.service -e` to inspect errors. |
| **Public IP changes after EC2 Stop/Start** | Dynamic public IP reallocation | Associate an **AWS Elastic IP** to the EC2 instance for a permanent IPv4 address. |

---

## 🎓 Learning Outcomes Demonstrated

- **Cloud Compute Lifecycle:** Launching, sizing, rebooting, and monitoring EC2 virtual machines.
- **Linux Systems Administration:** Package management with `apt`, systemd daemon control (`systemctl`), file permissions (`chmod`, `chown`).
- **Cloud Networking & Security:** Configuring virtual firewalls (Security Groups), subnets, Internet Gateways, and public IP routing.
- **Web Infrastructure:** Understanding how Apache handles incoming TCP sockets, request parsing, and static document serving.
- **DevOps & Automation:** Writing clean, idempotent Bash automation scripts for server initialization.

---

## 🔮 Future Enhancements

- [ ] **HTTPS / TLS Encryption:** Integrate free SSL/TLS certificates via **Let's Encrypt** and `certbot`.
- [ ] **Custom Domain & DNS:** Route traffic from a custom domain using **Amazon Route 53**.
- [ ] **Elastic IP Attachment:** Assign a persistent IPv4 address to maintain connectivity across instance lifecycle states.
- [ ] **CI/CD Pipeline:** Implement GitHub Actions to automatically deploy code updates directly to EC2 via SSH / SCP.

---

## 👤 Author & Portfolio Information

- **Author:** Arnav
- **Portfolio Focus:** AWS Cloud Architecture, DevOps & Cloud Computing
- **Project Repository:** [EC2-Based Web Server](https://github.com/your-username/EC2-Web-Server)
- **License:** MIT
