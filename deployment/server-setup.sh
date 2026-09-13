#!/usr/bin/env bash
# ==============================================================================
# AWS EC2 Web Server Setup Script (Ubuntu Linux)
# Project 3: EC2-Based Web Server (AWS Portfolio)
#
# Description:
#   This automation script configures an Ubuntu EC2 instance by updating
#   packages, installing the Apache2 HTTP server, enabling & starting the
#   service, checking systemd status, and preparing the document root
#   (/var/www/html/) for website deployment.
#
# Usage:
#   chmod +x server-setup.sh
#   ./server-setup.sh
# ==============================================================================

set -euo pipefail

# ANSI color codes for terminal readability
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${CYAN}======================================================${NC}"
echo -e "${CYAN}   AWS EC2 Apache Web Server Setup - Project 3       ${NC}"
echo -e "${CYAN}======================================================${NC}"
echo ""

# Ensure script is executed with appropriate privileges
if [[ $EUID -ne 0 ]]; then
  SUDO="sudo"
else
  SUDO=""
fi

# Step 1: Update apt package list
echo -e "${YELLOW}[1/5] Updating package repository index...${NC}"
$SUDO apt-get update -y
echo -e "${GREEN}✓ Package lists updated successfully.${NC}"
echo ""

# Step 2: Install Apache2 HTTP Server
echo -e "${YELLOW}[2/5] Installing Apache2 web server...${NC}"
$SUDO apt-get install -y apache2
echo -e "${GREEN}✓ Apache2 package installed successfully.${NC}"
echo ""

# Step 3: Enable Apache2 to start on system boot
echo -e "${YELLOW}[3/5] Enabling Apache2 service on boot...${NC}"
$SUDO systemctl enable apache2
echo -e "${GREEN}✓ Apache2 enabled to start on system boot.${NC}"
echo ""

# Step 4: Start Apache2 service
echo -e "${YELLOW}[4/5] Starting Apache2 service...${NC}"
$SUDO systemctl start apache2
echo -e "${GREEN}✓ Apache2 service started.${NC}"
echo ""

# Step 5: Verify Apache2 service status
echo -e "${YELLOW}[5/5] Checking Apache2 service status...${NC}"
$SUDO systemctl status apache2 --no-pager
echo ""

# Deployment Guidance and Information
WEB_ROOT="/var/www/html"
echo -e "${CYAN}======================================================${NC}"
echo -e "${GREEN}✓ Apache Web Server Setup Complete!${NC}"
echo -e "${CYAN}======================================================${NC}"
echo ""
echo -e "Web Server Document Root: ${YELLOW}${WEB_ROOT}/${NC}"
echo ""
echo "To deploy your website files into Apache, run:"
echo -e "  ${CYAN}sudo cp -r index.html css/ js/ assets/ ${WEB_ROOT}/${NC}"
echo ""
echo "To ensure correct file permissions, run:"
echo -e "  ${CYAN}sudo chown -R www-data:www-data ${WEB_ROOT}${NC}"
echo -e "  ${CYAN}sudo chmod -R 755 ${WEB_ROOT}${NC}"
echo ""
echo "Next step: In AWS EC2 Console, ensure Inbound Security Group allows:"
echo -e "  ${YELLOW}HTTP (TCP Port 80) -> 0.0.0.0/0 (Internet)${NC}"
echo ""
echo "Then access your site in a browser at: http://<YOUR_EC2_PUBLIC_IP>"
echo ""
