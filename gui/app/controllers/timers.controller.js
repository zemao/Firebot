"use strict";
(function() {
    angular
        .module("firebotApp")
        .controller("timersController", function(
            $scope,
            timerService,
            utilityService
        ) {

            $scope.timerService = timerService;

            $scope.onTimersUpdated = (timers) => {
                timerService.saveAllTimers(timers);
            };

            $scope.headers = [
                {
                    name: "NAME",
                    icon: "fa-user",
                    headerStyles: {
                        'min-width': '175px'
                    },
                    cellTemplate: `{{data.name}}`,
                    cellController: () => {}
                },
                {
                    name: "INTERVAL",
                    icon: "fa-stopwatch",
                    headerStyles: {
                        'min-width': '100px'
                    },
                    cellTemplate: `{{data.interval}}`,
                    cellController: () => {}
                },
                {
                    name: "REQUIRED CHAT LINES",
                    icon: "fa-align-center",
                    headerStyles: {
                        'min-width': '175px'
                    },
                    cellTemplate: `{{data.requiredChatLines}}`,
                    cellController: () => {}
                },
                {
                    name: "EFFECTS",
                    icon: "fa-magic",
                    headerStyles: {
                        'min-width': '100px'
                    },
                    cellTemplate: `{{data.effects ? data.effects.list.length : 0}}`,
                    cellControler: () => {}
                }
            ];

            $scope.timerOptions = (item) => {
                const options = [
                    {
                        html: `<a href ><i class="far fa-pen" style="margin-right: 10px;"></i> Edit</a>`,
                        click: function () {
                            timerService.showAddEditTimerModal(item);
                        }
                    },
                    {
                        html: `<a href ><i class="far fa-toggle-off" style="margin-right: 10px;"></i> Toggle Enabled</a>`,
                        click: function () {
                            timerService.toggleTimerActiveState(item);
                        }
                    },
                    {
                        html: `<a href ><i class="far fa-clone" style="margin-right: 10px;"></i> Duplicate</a>`,
                        click: function () {
                            timerService.duplicateTimer(item.id);
                        }
                    },
                    {
                        html: `<a href style="color: #fb7373;"><i class="far fa-trash-alt" style="margin-right: 10px;"></i> Delete</a>`,
                        click: function () {
                            utilityService
                                .showConfirmationModal({
                                    title: "Delete Timer",
                                    question: `Are you sure you want to delete the Timer "${item.name}"?`,
                                    confirmLabel: "Delete",
                                    confirmBtnType: "btn-danger"
                                })
                                .then(confirmed => {
                                    if (confirmed) {
                                        timerService.deleteTimer(item);
                                    }
                                });

                        }
                    }
                ];

                return options;
            };
        });
}());
