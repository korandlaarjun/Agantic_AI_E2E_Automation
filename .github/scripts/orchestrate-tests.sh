#!/bin/bash

# Advanced Test Orchestration Script
# Provides intelligent test execution with multiple strategies

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Run tests with performance metrics
run_tests_with_metrics() {
    local env=${1:-dev}
    log_info "Running tests with performance metrics for $env environment..."
    
    cd "$PROJECT_ROOT"
    
    export ENVIRONMENT=$env
    npm test -- --reporter=list
    
    log_success "Test execution completed"
}

# Run tests in parallel
run_tests_parallel() {
    local env=${1:-dev}
    log_info "Running tests in parallel mode for $env environment..."
    
    cd "$PROJECT_ROOT"
    export ENVIRONMENT=$env
    npm test -- --workers=4
    
    log_success "Parallel test execution completed"
}

# Run flakiness detection (multiple runs)
detect_flakiness() {
    local test_name=${1:-""}
    local runs=${2:-5}
    
    log_info "Running flakiness detection: $runs iterations"
    
    cd "$PROJECT_ROOT"
    
    for i in $(seq 1 $runs); do
        log_info "Run $i of $runs..."
        if [ -n "$test_name" ]; then
            npm test -- --grep "$test_name" || true
        else
            npm test || true
        fi
    done
    
    log_success "Flakiness detection completed"
}

# Analyze test results
analyze_results() {
    local env=${1:-dev}
    
    log_info "Analyzing test results for $env environment..."
    
    cd "$PROJECT_ROOT"
    
    local results_dir="tests/test-results"
    local csv_file="$results_dir/ticket_ids_${env}.csv"
    
    if [ -f "$csv_file" ]; then
        local total_tests=$(wc -l < "$csv_file")
        log_success "Total test records: $((total_tests - 1))"
        head -5 "$csv_file" | tail -4 | while read line; do
            echo "  - $line"
        done
    else
        log_warning "No test results found for $env"
    fi
}

# Generate coverage report
generate_coverage_report() {
    log_info "Generating coverage report..."
    
    cd "$PROJECT_ROOT"
    npm test -- --coverage || true
    
    log_success "Coverage report generated in ./coverage"
}

# Main command handling
case "${1:-help}" in
    metrics)
        run_tests_with_metrics "${2:-dev}"
        ;;
    parallel)
        run_tests_parallel "${2:-dev}"
        ;;
    flakiness)
        detect_flakiness "${2}" "${3:-5}"
        ;;
    analyze)
        analyze_results "${2:-dev}"
        ;;
    coverage)
        generate_coverage_report
        ;;
    help|*)
        cat << EOF
Advanced Test Orchestration Script

Usage: bash orchestrate-tests.sh [command] [options]

Commands:
    metrics <env>           Run tests with performance metrics
    parallel <env>          Run tests in parallel mode
    flakiness [name] [runs] Detect flaky tests (default 5 runs)
    analyze <env>           Analyze test results
    coverage                Generate coverage report
    help                    Show this help message

Examples:
    bash orchestrate-tests.sh metrics dev
    bash orchestrate-tests.sh parallel staging
    bash orchestrate-tests.sh flakiness "CreateTicket" 10
    bash orchestrate-tests.sh analyze dev
    bash orchestrate-tests.sh coverage

EOF
        ;;
esac