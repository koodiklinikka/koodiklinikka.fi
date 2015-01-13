#!/bin/bash
set -e

export ANSIBLE_SSH_ARGS="-o ForwardAgent=yes"

# Install dependencies
if ! which pip > /dev/null; then
  echo "Installing pip (requires sudo password)"
  sudo apt-get install python-pip || sudo easy_install pip
fi

if ! which ansible > /dev/null; then
  echo "Installing ansible (requires sudo password)"
  sudo pip install ansible
fi

cd $(dirname $0)
ansible-playbook deploy.yml -i hosts
