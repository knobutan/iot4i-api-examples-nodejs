/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the “License”);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an “AS IS” BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var request = require("request");
var config = require( "./config.js");
var csrfRequests = require("./csrfRequests.js");

/**
 * Creates a snapshot from the test data created by generateTestData
 * The connection information is taken from config.js
 */
function createSnapshot() {
	console.log("Creating a snapshot...");

	request({
		url: config.aggregator + "/snapshot",
		method: "POST",
		jar: csrfRequests.cookieJar,
		headers: {
			"X-CSRF-Token": csrfRequests.csrfToken,
		},
		auth: config.credentials
	},
	function(error, response, body) {
		if (error) {
			console.log("Failed to create snapshot. Error is: " + error);
		}
		else if (response.statusCode != 200) {
			console.log("Failed to create snapshot. Response is: " + response.statusCode + " - " + body);
		}
		else {
			console.log("Succesfully created snapshot.");
		}
	});
}

/**
 * Creates historical test data for display in the insurance dashboard.
 * The connection information is taken from config.js
 */
function generateTestData() {
	console.log("Creating test data...");

	request({
		url: config.aggregator + "/test/generateTestData",
		method: "POST",
		jar: csrfRequests.cookieJar,
		headers: {
			"X-CSRF-Token": csrfRequests.csrfToken,
		},
		auth: config.credentials
	},
	function(error, response, body) {
		if (error) {
			console.log("Failed to create test data. Error is: " + error);
		}
		else if (response.statusCode != 200) {
			console.log("Failed to create test data. Response is: " + response.statusCode + " - " + body);
		}
		else {
			console.log("Succesfully created test data.");
			createSnapshot();
		}
	});
}

csrfRequests.requestAggregatorWithCSRF(generateTestData);
