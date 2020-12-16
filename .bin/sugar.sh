#!/bin/bash

INTECRED_COMMAND=$1
shift

if [[ "$INTECRED_COMMAND" == "play" ]]; then
  eval "yarn lerna run $1 $2 $3"
elif [[ -z "$1" ]] || [[ $1 == --* ]]; then

  eval "yarn lerna run $INTECRED_COMMAND $@"
else
  INTECRED_WORKSPACES=$1
  shift

  IFS=', ' read -r -a workspaces <<< "$INTECRED_WORKSPACES"

  if [[ ${#workspaces[@]} -gt 1 ]]; then
    echo "Running command on $INTECRED_WORKSPACES workspaces"
    eval "yarn lerna run $INTECRED_COMMAND --scope=groovy-{$INTECRED_WORKSPACES} --parallel $@"
  else
    echo "Running command on $INTECRED_WORKSPACES workspace"
    eval "yarn lerna run $INTECRED_COMMAND --scope=groovy-$INTECRED_WORKSPACES --parallel $@"
  fi
fi
