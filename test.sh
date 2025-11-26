#!/bin/bash

# React Architect Local Testing Script
# This script tests all CLI functionality locally

echo "🧪 Testing React Architect CLI"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Create test directory
TEST_DIR="/tmp/react-architect-test-$$"
echo "📁 Creating test directory: $TEST_DIR"
mkdir -p "$TEST_DIR"
cd "$TEST_DIR"

# Test 1: Init command
echo ""
echo "${BLUE}Test 1: Testing 'react-architect init'${NC}"
if react-architect init; then
    echo "${GREEN}✓ Init command successful${NC}"
else
    echo "${RED}✗ Init command failed${NC}"
    exit 1
fi

# Verify folder structure
if [ -d "src/core" ] && [ -d "src/components" ] && [ -d "src/modules" ]; then
    echo "${GREEN}✓ Folder structure created${NC}"
else
    echo "${RED}✗ Folder structure missing${NC}"
    exit 1
fi

# Test 2: Generate component
echo ""
echo "${BLUE}Test 2: Testing component generation${NC}"
if react-architect g component TestButton; then
    echo "${GREEN}✓ Component generation successful${NC}"
else
    echo "${RED}✗ Component generation failed${NC}"
    exit 1
fi

# Verify component files
if [ -f "src/components/TestButton/TestButton.tsx" ] && \
   [ -f "src/components/TestButton/TestButton.module.scss" ] && \
   [ -f "src/components/TestButton/TestButton.types.ts" ] && \
   [ -f "src/components/TestButton/index.ts" ]; then
    echo "${GREEN}✓ All component files created${NC}"
else
    echo "${RED}✗ Component files missing${NC}"
    exit 1
fi

# Test 3: Generate module
echo ""
echo "${BLUE}Test 3: Testing module generation${NC}"
if react-architect g module auth; then
    echo "${GREEN}✓ Module generation successful${NC}"
else
    echo "${RED}✗ Module generation failed${NC}"
    exit 1
fi

# Verify module structure
if [ -d "src/modules/auth/components" ] && \
   [ -d "src/modules/auth/services" ] && \
   [ -d "src/modules/auth/hooks" ] && \
   [ -f "src/modules/auth/index.ts" ]; then
    echo "${GREEN}✓ Module structure created${NC}"
else
    echo "${RED}✗ Module structure missing${NC}"
    exit 1
fi

# Test 4: Generate component in module
echo ""
echo "${BLUE}Test 4: Testing component in module${NC}"
if react-architect g component LoginForm --module auth; then
    echo "${GREEN}✓ Module component generation successful${NC}"
else
    echo "${RED}✗ Module component generation failed${NC}"
    exit 1
fi

# Verify module component
if [ -f "src/modules/auth/components/LoginForm/LoginForm.tsx" ]; then
    echo "${GREEN}✓ Module component created${NC}"
else
    echo "${RED}✗ Module component missing${NC}"
    exit 1
fi

# Test 5: Generate service
echo ""
echo "${BLUE}Test 5: Testing service generation${NC}"
if react-architect g service Auth; then
    echo "${GREEN}✓ Service generation successful${NC}"
else
    echo "${RED}✗ Service generation failed${NC}"
    exit 1
fi

# Verify service file
if [ -f "src/core/services/AuthService.ts" ]; then
    echo "${GREEN}✓ Service file created${NC}"
else
    echo "${RED}✗ Service file missing${NC}"
    exit 1
fi

# Test 6: Generate service in module
echo ""
echo "${BLUE}Test 6: Testing service in module${NC}"
if react-architect g service User --module auth; then
    echo "${GREEN}✓ Module service generation successful${NC}"
else
    echo "${RED}✗ Module service generation failed${NC}"
    exit 1
fi

# Test 7: Generate hook
echo ""
echo "${BLUE}Test 7: Testing hook generation${NC}"
if react-architect g hook useAuth; then
    echo "${GREEN}✓ Hook generation successful${NC}"
else
    echo "${RED}✗ Hook generation failed${NC}"
    exit 1
fi

# Verify hook file
if [ -f "src/core/hooks/useAuth.ts" ]; then
    echo "${GREEN}✓ Hook file created${NC}"
else
    echo "${RED}✗ Hook file missing${NC}"
    exit 1
fi

# Test 8: Generate hook in module
echo ""
echo "${BLUE}Test 8: Testing hook in module${NC}"
if react-architect g hook useLogin --module auth; then
    echo "${GREEN}✓ Module hook generation successful${NC}"
else
    echo "${RED}✗ Module hook generation failed${NC}"
    exit 1
fi

# Show final structure
echo ""
echo "${BLUE}Final project structure:${NC}"
tree -L 4 -I 'node_modules' || find . -type f -not -path '*/\.*' | head -30

# Cleanup
echo ""
echo "🧹 Cleaning up test directory"
cd /
rm -rf "$TEST_DIR"

echo ""
echo "${GREEN}================================${NC}"
echo "${GREEN}✅ All tests passed!${NC}"
echo "${GREEN}================================${NC}"
echo ""
echo "React Architect is working correctly! 🎉"
