#!/bin/bash

# Get the current branch name
branch_now=$(git branch --show-current)

# Check if git repository
if [ -z "$branch_now" ]; then
  echo "Not in a git repository. Please navigate to a git repository and try again."
  exit 1
fi

# Prompt the user for a commit message
echo "Enter commit message:"
read msg

# Add all changes
git add .

# Commit with the provided message
git commit -m "$msg"

# Push to the current branch
git push origin "$branch_now"


# git checkout -b Appwrite-Todo-App
