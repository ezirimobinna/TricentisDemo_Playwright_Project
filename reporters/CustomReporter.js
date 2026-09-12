export default class CustomReporter {

    onBegin(config, suite) {
        console.log(
            `Test is beginning with Test Parallelism: ${config.fullyParallel} and number of tests ${suite.allTests().length}`
        );
    }

    onTestEnd(testCase, testResult) {
        console.log(
            `${testCase.title} test has ended with test result: ${testResult.status}`
        );
    }

    onEnd(finalTestResult) {
        console.log(
            `Test Result ended in ${finalTestResult.duration}ms with status: ${finalTestResult.status}`
        );
    }

    onExit() {
        console.log("All Tests Have Been Run");
    }
}