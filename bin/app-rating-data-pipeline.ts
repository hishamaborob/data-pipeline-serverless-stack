#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { AppRatingDataPipelineStack } from '../lib/app-rating-data-pipeline-stack';

const app = new cdk.App();
new AppRatingDataPipelineStack(app, 'AppRatingDataPipelineStack');
