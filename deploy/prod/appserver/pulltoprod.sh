#!/bin/bash -e
#===============================================================================
#       
#       This code is NOT free software; you cannot redistribute, modify, 
#       decompile, copy or publish without the prior written consent of 
#       
#		Author: Mikael Gulapa
#
#===============================================================================


scp ~i ~/.ssh/prod_rsa root@5.231.54.248/var/lib/jenkins/jobs/Build-ajsjee-prod/workspace/target/ajsjee-1.0-SNAPSHOT.war .