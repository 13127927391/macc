function demo(num, key){
	var num = num ;
	var key = key;
	if(num == 0){
			$(".table0").show();
			$(".table1").hide();
			$(".table2").hide();
			$(".table3").hide();
			$(".table4").hide();
			$(".table5").hide();
		}else if(num == 1){
			$(".table0").hide();
			$(".table1").show();
			$(".table2").hide();
			$(".table3").hide();
			$(".table4").hide();
			$(".table5").hide();

			$(".table1 tr:eq(0) td:eq(0)").html(key.L);
			$(".table1 tr:eq(0) td:eq(1)").html(key.W);
			$(".table1 tr:eq(1) td:eq(0)").html(key.H);
			$(".table1 tr:eq(1) td:eq(1)").html(key.Curb_weight);
			$(".table1 tr:eq(2) td:eq(0)").html(key.Maximum_load);
			$(".table1 tr:eq(2) td:eq(1)").html(key.Front_brake_type);
			$(".table1 tr:eq(3) td:eq(0)").html(key.After_brake_type);
			$(".table1 tr:eq(3) td:eq(1)").html(key.Front_suspension_type);
			$(".table1 tr:eq(4) td:eq(0)").html(key.After_suspension_type);
			$(".table1 tr:eq(4) td:eq(1)").html(key.Drive_form);
			$(".table1 tr:eq(5) td:eq(0)").html(key.Vehicle_body_type2);
			$(".table1 tr:eq(5) td:eq(1)").html(key.Compartment_volume);
			$(".table1 tr:eq(6) td:eq(0)").html(key.Fuel_tank_capacity);
			$(".table1 tr:eq(6) td:eq(1)").html(key.Seating);
			$(".table1 tr:eq(7) td:eq(0)").html(key.Minimum_ground_clearance);
			$(".table1 tr:eq(7) td:eq(1)").html(key.Minimum_bending_radius);
			$(".table1 tr:eq(8) td:eq(0)").html(key.Departure_angle);
			$(".table1 tr:eq(8) td:eq(1)").html(key.Approach_angle);

		}else if(num == 2){
			$(".table0").hide();
			$(".table1").hide();
			$(".table2").show();
			$(".table3").hide();
			$(".table4").hide();
			$(".table5").hide();
			$(".table2 tr:eq(0) td:eq(0)").html(key.Power_sunroof);
			$(".table2 tr:eq(0) td:eq(1)").html(key.Panoramic_sunroof);
			$(".table2 tr:eq(1) td:eq(0)").html(key.Xenon_headlamps);
			$(".table2 tr:eq(1) td:eq(1)").html(key.Front_fog_lamps);
			$(".table2 tr:eq(2) td:eq(0)").html(key.Rear_wiper);
			$(".table2 tr:eq(2) td:eq(1)").html(key.Air_conditioner);
			$(".table2 tr:eq(3) td:eq(0)").html(key.Automatic_air_conditioner);
			$(".table2 tr:eq(3) td:eq(1)").html(key.The_door_number);
			$(".table2 tr:eq(4) td:eq(0)").html(key.Vehicle_hood_type);
			$(".table2 tr:eq(4) td:eq(1)").html(key.Vehicle_roof_type);
			$(".table2 tr:eq(5) td:eq(0)").html(key.Wheelbase);
			$(".table2 tr:eq(5) td:eq(1)").html(key.Front_gauge);
			$(".table2 tr:eq(6) td:eq(0)").html(key.Rear_track);
			

		}else if(num == 3){
			$(".table0").hide();
			$(".table1").hide();
			$(".table2").hide();
			$(".table3").show();
			$(".table4").hide();
			$(".table5").hide();
			$(".table3 tr:eq(0) td:eq(0)").html(key.Engine_technology);
			$(".table3 tr:eq(0) td:eq(1)").html(key.Drive_type);
			$(".table3 tr:eq(1) td:eq(0)").html(key.Maximum_power_speed);
			$(".table3 tr:eq(1) td:eq(1)").html(key.Maximum_torque_speed);
			$(".table3 tr:eq(2) td:eq(0)").html(key.Cylinder_arrangement);
			$(".table3 tr:eq(2) td:eq(1)").html(key.Number_of_cylinder);
			$(".table3 tr:eq(3) td:eq(1)").html(key.Capacity_ml);
			$(".table3 tr:eq(3) td:eq(1)").html(key.Number_of_valves_per_cylinder);
			$(".table3 tr:eq(4) td:eq(0)").html(key.Cylinder_diameter);
			$(".table3 tr:eq(4) td:eq(1)").html(key.Cooling_way);
			$(".table3 tr:eq(5) td:eq(0)").html(key.HP);
			$(".table3 tr:eq(5) td:eq(1)").html(key.KW);
			$(".table3 tr:eq(6) td:eq(0)").html(key.Injection_type);
			$(".table3 tr:eq(6) td:eq(1)").html(key.Compression_ratio);
		}else if(num == 4){
			$(".table0").hide();
			$(".table1").hide();
			$(".table2").hide();
			$(".table3").hide();
			$(".table4").show();
			$(".table5").hide();

			$(".table4 tr:eq(0) td:eq(0)").html(key.Power_type);
			$(".table4 tr:eq(0) td:eq(1)").html(key.Transmission_description);
			$(".table4 tr:eq(1) td:eq(0)").html(key.Number_of_gear);
			$(".table4 tr:eq(1) td:eq(1)").html(key.Transmission_brand);
			$(".table4 tr:eq(2) td:eq(0)").html(key.Wave_box_type);
			$(".table4 tr:eq(2) td:eq(1)").html(key.Recommended_use_of_oil);
			$(".table4 tr:eq(3) td:eq(0)").html(key.The_original_installation_amount);
			$(".table4 tr:eq(3) td:eq(1)").html(key.Recommended_gravity_change);
			$(".table4 tr:eq(4) td:eq(0)").html(key.Machine_cycle_cleaning);
			$(".table4 tr:eq(4) td:eq(1)").html(key.Transmission_type);
			
		}else if(num == 5){
			$(".table0").hide();
			$(".table1").hide();
			$(".table2").hide();
			$(".table3").hide();
			$(".table4").hide();
			$(".table5").show();
			
			$(".table5 tr:eq(0) td:eq(0)").html(key.Front_tire_type);
			$(".table5 tr:eq(1) td:eq(0)").html(key.After_tire_type);
			$(".table5 tr:eq(2) td:eq(0)").html(key.Front_wheel_hub_type);
			$(".table5 tr:eq(3) td:eq(0)").html(key.After_wheel_hub_type);
			$(".table5 tr:eq(4) td:eq(0)").html(key.Wheel_hub_material);
			$(".table5 tr:eq(5) td:eq(0)").html(key.Spare_tire_type);
		
		}
}