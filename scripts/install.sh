# Install Homebrew if you haven't already
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Docker Desktop (includes Kubernetes)
brew install --cask docker

# Install Node.js (for TypeScript & React)
brew install node

# Install Python
brew install python@3.12

# Add Python to your PATH
echo 'export PATH="/opt/homebrew/opt/python@3.12/bin:$PATH"' >> ~/.zshrc
echo 'alias python=python3' >> ~/.zshrc
source ~/.zshrc

# Install PostgreSQL
brew install postgresql@14

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml
